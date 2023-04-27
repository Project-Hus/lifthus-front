import { Box } from "@chakra-ui/layout";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import commentApi from "../../../../api/commentApi";
import { CommentContent } from "../../../../api/interfaces/commentApi.interface";
import Comment from "./comment";
const ReplyList = ({ comment_id }: { comment_id: number }) => {
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
  return <Box paddingLeft="10%">{reply_comment_list}</Box>;
};
export default ReplyList;
