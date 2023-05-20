import { Box } from "@chakra-ui/layout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import commentApi from "../../../../api/commentApi";
import Comment from "./comment";
import { ThemeColor } from "../../../../common/styles/theme.style";
import { QueryReplyDto } from "../../../../api/dtos/comment.dto";

interface ReplyListProps {
  IsPadding: boolean;
  replies?: QueryReplyDto[];
}
const ReplyList = ({ IsPadding, replies }: ReplyListProps) => {
  //call comment data from api(임시)
  const [comments, setComments] = useState<CommentContent[]>([]);

  const reply_comment_obj = useQuery({
    queryKey: ["reply_comment_obj", comment_id],
    queryFn: () => commentApi.get_reply_comments(comment_id),
    onSuccess: (data: CommentContent[]) => {
      setComments(data);
    },
  });
  const reply_comment_list = [];
  for (const comment of comments) {
    reply_comment_list.push(<Comment comment={comment}></Comment>);
  }
  return (
    <Box
      backgroundColor={ThemeColor.backgroundColor}
      paddingLeft={Ispadding ? "10%" : "0%"}
    >
      {reply_comment_list}
    </Box>
  );
};
export default ReplyList;
