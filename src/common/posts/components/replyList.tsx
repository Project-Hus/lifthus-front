import { Box } from "@chakra-ui/layout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import commentApi from "../../../api/commentApi";
import Comment from "./comment";
import { ThemeColor } from "../../styles/theme.style";
import { QueryReplyDto } from "../../../api/dtos/comment.dto";

interface ReplyListProps {
  IsPadding: boolean;
  replies: QueryReplyDto[];
}
const ReplyList = ({ IsPadding, replies }: ReplyListProps) => {
  const replyCommentList = [];
  for (const reply of replies) {
    replyCommentList.push(<Comment key={reply.id} comment={reply}></Comment>);
  }
  return (
    <Box
      backgroundColor={ThemeColor.backgroundColorDarker}
      paddingLeft={IsPadding ? "5%" : "0%"}
      background-clip="content-box"
    >
      {replyCommentList}
    </Box>
  );
};
export default ReplyList;
