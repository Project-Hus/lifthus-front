import React from "react";
import { Box } from "@chakra-ui/layout";
import Comment from "./comment";
import useUserStore from "../../../../store/user.zustand";
import { QueryCommentDto } from "../../../../api/dtos/comment.dto";

interface CommentListProps {
  comments: QueryCommentDto[];
}
const CommentList = ({ comments }: CommentListProps) => {
  const commentList = [];
  for (const comment of comments) {
    commentList.push(<Comment key={comment.id} comment={comment}></Comment>);
  }

  return (
    <>
      <Box>{commentList}</Box>
    </>
  );
};

export default CommentList;
