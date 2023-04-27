import {
  CommentContent,
  PostCommentParams,
  DeleteCommentParams,
  UpdateCommentParams,
} from "../../../../api/interfaces/commentApi.interface";
import {
  Card,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Flex, Text } from "@chakra-ui/layout";
import useUserStore from "../../../../store/user.zustand";
import { Button } from "@chakra-ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentApi from "../../../../api/commentApi";
import { css } from "@emotion/react";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";

const Comment = ({ comment }: { comment: CommentContent }) => {
  const CommentBoard = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
  `;

  const CommentEdit = css`
    border: 0px solid black;
    border-radius: 5px;
    padding: 10px;
  `;

  //get comment data
  const comment_user_id = comment.user_id;
  const created_at = comment.created_at;
  const updated_at = comment.updated_at;

  //call user_id from zustand
  const { user_id, username } = useUserStore();

  //Call the CommentText
  const InputRef = useRef<HTMLInputElement>(null);
  const EditInputRef = useRef<HTMLInputElement>(null);

  // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
  const queryClient = useQueryClient();

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, isOpen, onOpen, onClose } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  //open/close comment window functions
  const {
    getDisclosureProps: EditgetDisclosureProps,
    getButtonProps: EditgetButtonProps,
  } = useDisclosure();
  const EditbuttonProps = EditgetButtonProps();
  const EditdisclosureProps = EditgetDisclosureProps();

  //state for comment edit
  const [IsCommentEdit, setCommentEdit] = useState(false);

  //make usemutation to save the comment
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: PostCommentParams) =>
      await commentApi.post_comment({
        rep_id: data.rep_id,
        text: data.text,
        user_id: user_id,
        IsReply: true,
        reply_to: data.reply_to,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comment_obj"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //make usemutation to Edit the comment
  const {
    mutate: EditMutate,
    isLoading: EditIsLoading,
    error: EditError,
  } = useMutation({
    mutationFn: async (data: UpdateCommentParams) =>
      await commentApi.update_comment({
        user_id: user_id,
        comment_id: comment.comment_id,
        comment: data.comment,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comment_obj"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //make usemutation to delete the comment
  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useMutation({
    mutationFn: async () =>
      await commentApi.delete_comment({
        user_id: user_id,
        comment_id: comment.comment_id,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comment_obj"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //save comment function
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    if (InputRef.current?.value == "" || InputRef.current?.value == null) {
      return alert("Please write the comment");
    }
    const text = InputRef.current?.value;

    // updateCommentList
    mutate({
      user_id: comment_user_id,
      text: text,
      rep_id: comment.rep_id,
      IsReply: false,
      reply_to: comment.comment_id,
    });
    return;
  };

  //make delete function onclick the button
  const deleteComment = () => {
    deleteMutate();
  };

  //make edit function onclick the button
  const editComment = () => {
    if (EditInputRef.current?.value == null) {
      return alert("Please write the comment");
    }
    EditMutate({
      user_id: user_id,
      comment_id: comment.comment_id,
      comment: {
        rep_id: comment.rep_id,
        comment_id: comment.comment_id,
        user_id: comment_user_id,
        created_at: created_at,
        reply_to: comment.reply_to,
        IsReply: comment.IsReply,
        updated_at: new Date(),

        text: EditInputRef.current?.value,
      },
    });
    setCommentEdit(false);
  };

  return (
    <>
      <CommentBoard>
        {/* the main comment */}
        <Card>
          Comment_id {comment.comment_id}
          <Text as="b">
            {comment_user_id}
            <br />
            {updated_at == null
              ? created_at.toLocaleString()
              : updated_at.toLocaleString()}
          </Text>
          {/* comment edit window */}
          {IsCommentEdit == true && (
            <>
              <Input
                name="EditedComment"
                defaultValue={comment.text}
                ref={EditInputRef}
              />
              <Button onClick={() => setCommentEdit(false)}>Cancel</Button>
              <Button
                type="submit"
                {...EditbuttonProps}
                onClick={editComment}
                isLoading={EditIsLoading}
                variant="solid"
                display="inline-block"
                alignSelf="end"
              >
                Save
              </Button>
            </>
          )}
          {comment.IsReply && (
            <Text>
              this comment reply to Commend_id {comment.reply_to?.toString()}{" "}
            </Text>
          )}
          <br />
          {IsCommentEdit == false && <Text>{comment.text}</Text>}
          <Flex>
            {IsCommentEdit == false && (
              <Button alignSelf="start" {...buttonProps}>
                reply
              </Button>
            )}
            {user_id == comment_user_id && IsCommentEdit == false && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<EditIcon />}
                  variant="outline"
                  alignSelf="end"
                />
                <MenuList>
                  <MenuItem>
                    <Button isLoading={deleteIsLoading} onClick={deleteComment}>
                      delete
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={() => setCommentEdit(true)}>Edit</Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          {/* relpy comment window*/}
          <Card {...disclosureProps}>
            <Input
              css={CommentEdit}
              ref={InputRef}
              placeholder="write the reply"
            />
            <Button
              isLoading={isLoading}
              type="submit"
              {...buttonProps}
              variant="solid"
              display="inline-block"
              alignSelf="end"
              onClick={save}
            >
              Save
            </Button>
          </Card>
        </Card>
      </CommentBoard>
    </>
  );
};

export default Comment;
