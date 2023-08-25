import React from "react";
import { Box } from "@chakra-ui/layout";
import { useQuery } from "@tanstack/react-query";

import CommentCreate from "./commentCreate";
import commentApi from "../../../api/commentApi";
import useUserStore from "../../../store/user.zustand";
import Comment from "./Comment";

const CommentListV2 = ({
  pid,
  onClose,
}: {
  pid: number | undefined;
  onClose: () => void | undefined;
}) => {
  const { uid: clientUid } = useUserStore();

  // query the comments of the post
  const { data: comments } = useQuery({
    queryKey: ["comments", { pid }],
    queryFn: async () => {
      if (!pid) return Promise.reject(undefined);
      return await commentApi.getComments(pid);
    },
  });

  const commentList = comments
    ? comments.map((comment) => (
        <Comment key={comment.id} comment={comment}></Comment>
      ))
    : [];
  return (
    <>
      {!!clientUid && pid && <CommentCreate postId={pid} onClose={onClose} />}
      <Box>{commentList}</Box>
    </>
  );
};

export default CommentListV2;
