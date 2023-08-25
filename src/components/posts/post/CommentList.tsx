import React, { useEffect } from "react";
import Comment from "./Comment";
import { Box } from "@chakra-ui/react";
import commentApi from "../../../api/commentApi";
import { useQuery } from "@tanstack/react-query";

const CommentList = ({
  pid,
  getNumber,
}: {
  pid: number;
  getNumber: (number: number) => void;
}) => {
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

  // provide the number of comments to the parent when it changes.
  useEffect(() => {
    getNumber(numComments);
  }, [numComments]);

  const commentList = comments
    ? comments.map((comment) => (
        <Comment key={comment.id} postId={comment.postId} comment={comment} />
      ))
    : [];

  return <Box>{commentList}</Box>;
};

export default CommentList;
