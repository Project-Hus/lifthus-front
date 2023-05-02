import { Button, Card, Input, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import commentApi from "../../../../api/commentApi";
import {
  CommentContent,
  PostCommentParams,
} from "../../../../api/interfaces/commentApi.interface";
import useUserStore from "../../../../store/user.zustand";
import emotion, { css } from "@emotion/react";
// 새로운 Comment를 생성하는 컴포넌트
const CommentCreate = ({ rep_id }: { rep_id: number }) => {
  const CommentEdit = css`
    border: 0px solid black;
    border-radius: 5px;
    padding: 10px;
  `;

  //call user_id from zustand
  const { user_id } = useUserStore();

  //save comment function
  const save = (e: Event) => {
    e.preventDefault();
    if (InputRef.current?.value == "" || InputRef.current?.value == null) {
      return alert("Please write the comment");
    }
    const text = InputRef.current?.value;

    // updateCommentList
    mutate({ user_id: user_id, text: text, rep_id: rep_id, IsReply: false });
    return;
  };

  //Call the CommentText
  const InputRef = useRef<HTMLInputElement>(null);

  // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
  const queryClient = useQueryClient();

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, isOpen, onOpen, onClose } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  //make usemutation to save the comment
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ user_id, text, rep_id, IsReply }: PostCommentParams) =>
      await commentApi.post_comment({
        rep_id: rep_id,
        text: text,
        user_id: user_id,
        IsReply: false,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comment_obj"] });
      onClose();
      InputRef.current!.value = "";
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Input css={CommentEdit} ref={InputRef} placeholder="write the reply" />
      <Button
        isLoading={isLoading}
        size="sm"
        type="submit"
        {...buttonProps}
        variant="solid"
        display="inline-block"
        alignSelf="end"
        onClick={save}
      >
        Save
      </Button>
    </>
  );
};

export default CommentCreate;
