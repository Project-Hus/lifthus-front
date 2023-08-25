import React from "react";
import Comment from "./Comment";
import { QueryCommentDto } from "../../../api/dtos/comment.dto";
import { Box } from "@chakra-ui/react";

const CommentList = ({ comments }: { comments: QueryCommentDto[] }) => {
  const commentList = comments
    ? comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    : [];

  return <Box>{commentList}</Box>;
};

export default CommentList;
