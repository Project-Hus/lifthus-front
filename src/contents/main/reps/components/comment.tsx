import {
    CommentContent,
    PostCommentParams,
    DeleteCommentParams,
} from "../../../../api/interfaces/commentApi.interface";
import { Card, Input, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Text } from "@chakra-ui/layout";
import useUserStore from "../../../../store/user.zustand";
import { Button } from "@chakra-ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentApi from "../../../../api/commentApi";
import { css } from "@emotion/react";
import { useRef } from "react";

import CommentEdit from "./commentCreate";

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

    //call user_id from zustand
    const { user_id, username } = useUserStore();

    //save comment function
    const save = (e: Event) => {
        e.preventDefault();
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

    //make usemutation to delete the comment
    const { mutate: deleteMutate, isLoading: deleteIsLoading, error: deleteError } =

        useMutation({
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

    //make delete function onclick the button
    const deleteComment = () => {
        deleteMutate();
    };

    return (
        <>
            <CommentBoard>
                <Card>
                    Comment_id {comment.comment_id}
                    <Text as="b">
                        {comment_user_id}-{created_at.toString()}-
                    </Text>
                    {comment.IsReply && (
                        <Text>
                            this comment reply to Commend_id {comment.reply_to?.toString()}{" "}
                        </Text>
                    )}
                    <br />
                    <Text>{comment.text}</Text>
                    <Button {...buttonProps}>reply</Button>
                    {user_id == comment_user_id && <Button isLoading={deleteIsLoading} onClick={deleteComment}>delete</Button>}
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
