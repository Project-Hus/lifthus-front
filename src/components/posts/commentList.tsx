import React from "react";
import { Box } from "@chakra-ui/layout";
import { QueryCommentDto } from "../../api/dtos/comment.dto";
import Comment from "./comment";

interface CommentListProps {
  comments: QueryCommentDto[];
}
const CommentList = ({ comments }: CommentListProps) => {
  const commentList = comments.map((comment) => (
    <Comment key={comment.id} comment={comment}></Comment>
  ));
  return (
    <>
      <Box>{commentList}</Box>
    </>
  );
};

export default CommentList;
