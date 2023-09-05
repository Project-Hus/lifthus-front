import { Button, Card, Flex, Input, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentApi from "../../../api/commentApi";
import useUserStore from "../../../store/user.zustand";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import {
  CreateCommentDto,
  CreateReplyDto,
} from "../../../api/dtos/comment.dto";
import { ThemeColor } from "../../../common/styles/theme.style";

interface CommentCreateProps {
  postId: string;
  parentId?: string;
  onClose?: () => void;
}

const CommentCreate = ({ postId, parentId, onClose }: CommentCreateProps) => {
  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  });

  const { uid: clientUid } = useUserStore();

  const queryClient = useQueryClient();

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, isOpen, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();

  const { mutate: createComment, isLoading: createCommentLoading } =
    useMutation({
      mutationFn: async (comment: CreateCommentDto) => {
        await commentApi.createComment(comment);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({
          queryKey: ["comments", { pid: postId }],
        });
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
      queryClient.invalidateQueries({
        queryKey: ["comments", { pid: postId }],
      });
      reset();
      parentId && onClose ? onClose() : onOpen();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const writeComment = (data: any) => {
    if (data.comment == "") {
      alert("please write the comment");
      return;
    }
    const text: string = data.comment;

    if (parentId) {
      return createReply({
        parentId: parentId,
        author: clientUid,
        content: text,
      });
    }
    createComment({
      postId: postId,
      author: clientUid,
      content: text,
    });
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit(writeComment)}>
        <Flex bg={ThemeColor.backgroundColorDarker} padding="0.5em">
          <Input
            placeholder="write the reply"
            color="white"
            _focus={{
              bg: ThemeColor.backgroundColor,
            }}
            {...register("comment", { maxLength: 531 })}
          />
          <Button
            isLoading={createCommentLoading && createReplyLoading}
            size="md"
            type="submit"
            {...buttonProps}
            variant="ghost"
            color="white"
            display="inline-block"
            alignSelf="end"
            _hover={{ bg: ThemeColor.backgroundColor }}
          >
            Write
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default CommentCreate;
