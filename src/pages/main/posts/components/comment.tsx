import { ThemeColor } from "../../../../common/styles/theme.style";
import {
  Avatar,
  Box,
  Card,
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
import { Button } from "@chakra-ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentApi from "../../../../api/commentApi";
import { useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import ReplyList from "./replyList";
import userApi from "../../../../api/userApi";
import { useForm } from "react-hook-form";
import CommentCreate from "./commentCreate";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import {
  QueryCommentDto,
  UpdateCommentDto,
} from "../../../../api/dtos/comment.dto";
import { Username } from "../../../../api/interfaces/userApi.interface";
import useUserStore from "../../../../store/user.zustand";

interface CommentProps {
  comment: QueryCommentDto;
}
const Comment = ({ comment }: CommentProps) => {
  const CommentBoard = styled(Card)`
    border-radius: 0%;
    box-shadow: none;
    background-color: ${ThemeColor.backgroundColor};
    padding: 0.5em;
  `;

  //get comment data
  const author = comment.author;
  const createdAt = comment.createdAt;
  const updatedAt = comment.updatedAt;
  const [authorname, setAuthorname] = useState("loading...");
  useQuery(
    ["username", author],
    () => {
      return userApi.getNameById({ uid: author });
    },
    {
      onSuccess: (data: Username) => {
        setAuthorname(data.username);
      },
    }
  );

  const { uid, username } = useUserStore();

  //Call the CommentText
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

  //make usemutation to Edit the comment
  const {
    mutate: EditMutate,
    isLoading: EditIsLoading,
    error: EditError,
  } = useMutation({
    mutationFn: async (data: UpdateCommentDto) =>
      await commentApi.updateComment({
        author: author,
        id: comment.id,
        content: data.content,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });

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
    mutationFn: async () => await commentApi.deleteComment(comment.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });
      console.log("delete success", author, comment.id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
      author: author,
      id: comment.id,
      content: EditInputRef.current?.value,
    });
    setCommentEdit(false);
  };
  //react-hook-form
  const { register, handleSubmit } = useForm();

  return (
    <>
      <CommentBoard>
        {/* the main comment */}

        {/* Comment_id {comment.comment_id} */}
        <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
          <Avatar
            size="sm"
            name={authorname}
            src={USER_PROFILE_IMAGE_ROUTE + authorname + ".jpeg"}
          />
          <Text as="b" fontSize="sm" color="white">
            {authorname}
          </Text>
        </Flex>
        <Text color="gray.400" fontSize="sm">
          {updatedAt == null
            ? createdAt.toString().slice(0, 21)
            : updatedAt.toString().slice(0, 21)}
        </Text>
        {/* comment edit window */}
        {IsCommentEdit == true && (
          <>
            <Input
              name="EditedComment"
              defaultValue={comment.content}
              ref={EditInputRef}
              backgroundColor="white"
            />
            <Flex direction={"row"} alignSelf="self-end">
              <Button size="sm" onClick={() => setCommentEdit(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                {...EditbuttonProps}
                onClick={editComment}
                isLoading={EditIsLoading}
                variant="solid"
                display="inline-block"
              >
                Save
              </Button>
            </Flex>
          </>
        )}
        <Flex>
          {IsCommentEdit == false && (
            <Button size="sm" alignSelf="start" {...buttonProps}>
              reply
            </Button>
          )}
          {uid == author && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<EditIcon />}
                variant="outline"
                alignSelf="end"
                size="sm"
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
        <Box {...disclosureProps}>
          <Card>
            <CommentCreate
              rep_id={comment.postId}
              IsReply={true}
              reply_to={comment.id}
              onClose={onClose}
            ></CommentCreate>
          </Card>
        </Box>
      </CommentBoard>
      <ReplyList replies={comment.replies}></ReplyList>
    </>
  );
};

export default Comment;
