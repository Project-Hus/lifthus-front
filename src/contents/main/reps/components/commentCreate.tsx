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
import { useForm, Controller, SubmitHandler } from "react-hook-form";




// 새로운 Comment를 생성하는 컴포넌트
const CommentCreate = ({ rep_id, IsReply, reply_to, onClose, reply_to_who }: { rep_id: number, IsReply: boolean, reply_to?: number, onClose: () => void, reply_to_who?: string }) => {
  if (reply_to_who === undefined) {
    reply_to_who = ""
  }
  console.log("reply_to_who: " + reply_to_who)

  if (onClose === undefined) {
    onClose = () => {
      console.log("onClose is undefined")
    }
  }

  const CommentEdit = css`
    border: 0px solid black;
    border-radius: 5px;
    padding: 10px;
  `;
  // useForm을 이용하여 form을 관리
  const { register, handleSubmit, reset } = useForm();

  //call user_id from zustand
  const { user_id } = useUserStore();

  //save comment function
  const save = (data: any) => {
    console.log(data.NewComment)
    if (data.NewComment == "") {
      alert("please write the comment")
      return
    }
    const text = data.NewComment

    // updateCommentList
    mutate({ user_id: user_id, text: text, rep_id: rep_id, IsReply: IsReply, reply_to: reply_to, reply_to_who: reply_to_who });
    return;
  };


  // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
  const queryClient = useQueryClient();

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, isOpen, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  //make usemutation to save the comment
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ user_id, text, rep_id, IsReply, reply_to, reply_to_who }: PostCommentParams) =>
      await commentApi.post_comment({
        rep_id: rep_id,
        text: text,
        user_id: user_id,
        IsReply: IsReply,
        reply_to: reply_to,
        reply_to_who: reply_to_who
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comment_obj"] });
      queryClient.invalidateQueries({ queryKey: ["reply_comment_obj"] });
      reset();

      IsReply ? onClose() : onOpen();
    },
    onError: (error) => {
      console.log(error);
    },
  });


  return (
    <><form onSubmit={handleSubmit(save)}>

      <Input css={CommentEdit} placeholder="write the reply" {...register("NewComment")} backgroundColor="white" />
      <Button
        isLoading={isLoading}
        size="sm"
        type="submit"
        {...buttonProps}
        variant="solid"
        display="inline-block"
        alignSelf="end"
      >
        Save
      </Button>
    </form>
    </>
  );
};

export default CommentCreate;
