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
import ReplyList from "./replyList";
import userApi from "../../../../api/userApi";
import CommentCreate from "./commentCreate";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import {
  QueryCommentDto,
  QueryReplyDto,
  UpdateCommentDto,
} from "../../../../api/dtos/comment.dto";
import { Username } from "../../../../api/interfaces/userApi.interface";
import useUserStore from "../../../../store/user.zustand";
import { commentFoldStandard } from "../../../../common/constraints";
import { EditIcon } from "@chakra-ui/icons";

interface CommentProps {
  comment: QueryCommentDto | QueryReplyDto;
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
      if ("postId" in comment)
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      if ("parentId" in comment)
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });

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
      if ("postId" in comment)
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      if ("parentId" in comment)
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
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

  const [IsFold, setFold] = useState(true);

  const IconbuttonStyle = styled.div`
    padding-top: 0em;
    & > Button {
      background-color: ${ThemeColor.backgroundColor};
      padding-left: 0em;
      :hover {
        text-decoration-line: underline;
      }
      :hover {
        background-color: ${ThemeColor.backgroundColor};
      }
    }
  `;

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
        {/* comment content */}
        {IsCommentEdit == false && (
          <>
            <Text
              style={{ whiteSpace: "pre-wrap" }}
              size="sm"
              fontSize="sm"
              color="white"
            >
              {IsFold && comment.content.length > commentFoldStandard.Length
                ? comment.content.slice(0, commentFoldStandard.Length) + "..."
                : comment.content}
            </Text>

            {comment.content.length > commentFoldStandard.Length && (
              <IconbuttonStyle>
                {IsFold ? (
                  <Button
                    alignSelf="flex-start"
                    onClick={() => setFold(false)}
                    size="sm"
                  >
                    more...
                  </Button>
                ) : (
                  <Button
                    alignSelf="flex-start"
                    onClick={() => setFold(true)}
                    size="sm"
                  >
                    {" "}
                    shortly...
                  </Button>
                )}
              </IconbuttonStyle>
            )}
          </>
        )}
        {/* comment edit */}
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
            <>
              <Button
                size="sm"
                isLoading={deleteIsLoading}
                onClick={deleteComment}
              >
                delete
              </Button>
              <Button size="sm" onClick={() => setCommentEdit(true)}>
                Edit
              </Button>
            </>
          )}
        </Flex>
        {/* relpy comment window*/}
        <Box {...disclosureProps}>
          <Card>
            {"postId" in comment && (
              <CommentCreate postId={comment.postId} onClose={onClose} />
            )}
            {"parentId" in comment && (
              <CommentCreate parentId={comment.parentId} onClose={onClose} />
            )}
          </Card>
        </Box>
      </CommentBoard>
      {"postId" in comment && comment.replies && (
        <ReplyList
          replies={comment.replies}
          IsPadding={!!comment.postId}
        ></ReplyList>
      )}
    </>
  );
};

export default Comment;
