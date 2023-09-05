import { Box } from "@chakra-ui/layout";
import { QueryReplyDto } from "../../../api/dtos/comment.dto";
import { ThemeColor } from "../../../common/styles/theme.style";
import Comment from "./Comment";

interface ReplyListProps {
  IsPadding: boolean;
  replies: QueryReplyDto[];
  postId: string;
}
const ReplyList = ({ IsPadding, replies, postId }: ReplyListProps) => {
  const replyCommentList = [];
  for (const reply of replies) {
    replyCommentList.push(
      <Comment key={reply.id} postId={postId} comment={reply}></Comment>
    );
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
