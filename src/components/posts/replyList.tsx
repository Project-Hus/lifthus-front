import { Box } from "@chakra-ui/layout";
import { QueryReplyDto } from "../../api/dtos/comment.dto";
import { ThemeColor } from "../../common/styles/theme.style";
import Comment from "./comment";

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
