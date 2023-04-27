//make commentApi
import { CommentApi } from "./interfaces/commentApi.interface";
import { CommentContent } from "./interfaces/commentApi.interface";
import { UserId } from "./interfaces/userApi.interface";
import {
  PostCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from "./interfaces/commentApi.interface";
import commentTestApi from "./testApi/commentTestApi";

const commentApi: CommentApi = {
  get_user_comments: async ({ user_id }: UserId): Promise<CommentContent[]> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.get_user_comments({ user_id });
    }
    return commentTestApi.get_user_comments({ user_id });
  },

  post_comment: async ({
    user_id,
    rep_id,
    text,
    IsReply,
    reply_to,
  }: PostCommentParams): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.post_comment({
        user_id,
        rep_id,
        text,
        IsReply,
        reply_to,
      });
    }
    return commentTestApi.post_comment({ user_id, rep_id, text, IsReply });
  },

  update_comment: async ({
    user_id,
    comment_id,
    comment,
  }: UpdateCommentParams): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.update_comment({ user_id, comment_id, comment });
    }
    return commentTestApi.update_comment({ user_id, comment_id, comment });
  },
  delete_comment: async ({
    user_id,
    comment_id,
  }: DeleteCommentParams): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.delete_comment({ user_id, comment_id });
    }
    return commentTestApi.delete_comment({ user_id, comment_id });
  },
  get_rep_comments: function (rep_id: number): Promise<CommentContent[]> {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.get_rep_comments(rep_id);
    }
    return commentTestApi.get_rep_comments(rep_id);
  },
  get_reply_comments(comment_id) {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.get_reply_comments(comment_id);
    }
    return commentTestApi.get_reply_comments(comment_id);
  },
};
export default commentApi;
