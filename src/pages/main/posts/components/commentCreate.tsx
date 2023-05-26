import { Button, Card, Flex, Input, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentApi from "../../../../api/commentApi";
import useUserStore from "../../../../store/user.zustand";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import {
  CreateCommentDto,
  CreateReplyDto,
} from "../../../../api/dtos/comment.dto";

interface CommentCreateProps {
  postId?: number;
  parentId?: number;
  onClose?: () => void;
}
// 새로운 Comment를 생성하는 컴포넌트
const CommentCreate = ({ postId, parentId, onClose }: CommentCreateProps) => {
  if (onClose === undefined) {
    onClose = () => {
      console.log("onClose is undefined");
    };
  }

  const CommentEdit = css`
    border: 0px solid black;
    border-radius: 5px;
    padding: 1.5em;
  `;
  // useForm을 이용하여 form을 관리
  const { register, handleSubmit, reset } = useForm();

  //call user_id from zustand
  const { uid } = useUserStore();

  // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
  const queryClient = useQueryClient();

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, isOpen, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const { mutate: createComment, isLoading: createCommentLoading } =
    useMutation({
      mutationFn: async (comment: CreateCommentDto) => {
        await commentApi.createComment(comment);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        reset();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: createReply, isLoading: createReplyLoading } = useMutation({
    mutationFn: async (comment: CreateReplyDto) => {
      await commentApi.createReply(comment);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      parentId && onClose ? onClose() : onOpen();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //save comment function
  const save = (data: any) => {
    if (data.NewComment == "") {
      alert("please write the comment");
      return;
    }
    const text: string = data.NewComment;

    if (postId) {
      createComment({
        postId: postId,
        author: uid,
        content: text,
      });
      return;
    }
    if (parentId) {
      createReply({
        parentId: parentId,
        author: uid,
        content: text,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(save)}>
        <Flex direction={"column"}>
          <Input
            css={CommentEdit}
            placeholder="write the reply"
            {...register("NewComment")}
            backgroundColor="white"
          />
          <Button
            isLoading={createCommentLoading && createReplyLoading}
            size="sm"
            type="submit"
            {...buttonProps}
            variant="solid"
            display="inline-block"
            alignSelf="end"
          >
            Write
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default CommentCreate;
