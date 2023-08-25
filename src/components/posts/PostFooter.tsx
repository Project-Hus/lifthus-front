import {
  Button,
  Card,
  CardFooter,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import commentApi from "../../api/commentApi";
import postApi from "../../api/postApi";
import { ThemeColor } from "../../common/styles/theme.style";
import useUserStore from "../../store/user.zustand";
import CommentListV2 from "./post/CommentListV2";

const PostFooter = ({ pid, likenum }: { pid: number; likenum: number }) => {
  const queryClient = useQueryClient();
  const { uid: clientUid } = useUserStore();

  const { getDisclosureProps, getButtonProps, onClose } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  // query the comments of the post
  const { data: comments } = useQuery({
    queryKey: ["comments", { pid }],
    queryFn: async () => {
      if (!pid) return Promise.reject(undefined);
      return await commentApi.getComments(pid);
    },
  });

  // get the number of comments
  let numComments = (comments && comments.length) || 0;
  if (comments) {
    for (const c of comments) {
      numComments += c.replies ? c.replies.length : 0;
    }
  }

  // like post mutation
  const { mutate: likeMutate, isLoading: likeLoading } = useMutation(
    async () => await postApi.likePost(pid),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["post", { pid }] });
      },
    }
  );

  return (
    <>
      <CardFooter justify="space-between">
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<>{likeLoading ? <Spinner /> : "🤍"}</>}
          _hover={{ bg: ThemeColor.backgroundColor }}
          onClick={
            clientUid
              ? () => likeMutate()
              : () => (window.location.href = "/sign")
          }
        >
          <Text color="white">{likenum} Likes</Text>
        </Button>
        <Button
          {...buttonProps}
          flex="1"
          variant="ghost"
          leftIcon={<>💬</>}
          _hover={{ bg: ThemeColor.backgroundColor }}
        >
          <Text color="white">{numComments} Comments</Text>
        </Button>
      </CardFooter>
      <Card {...disclosureProps}>
        <CommentListV2 pid={pid} onClose={onClose} />
      </Card>
    </>
  );
};

export default PostFooter;
