//make testapi for comment
import { CommentApi } from "../interfaces/commentApi.interface";
import comment_list from "../mocks/commentApi.mocks";
import { CommentContent } from "../interfaces/commentApi.interface";
import { UserId } from "../interfaces/userApi.interface";
import {
  PostCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from "../interfaces/commentApi.interface";
const commentTestApi: CommentApi = {
  get_user_comments: async ({ user_id }: UserId): Promise<CommentContent[]> => {
    let comments: CommentContent[] = [];
    for (const k in comment_list) {
      if (comment_list[k].user_id === user_id) comments.push(comment_list[k]);
    }
    return comments;
  },

  post_comment: async ({
    user_id,
    rep_id,
    text,
    IsReply,
    reply_to,
  }: PostCommentParams): Promise<UserId> => {
    return new Promise((resolve) => {
      const last_index = Object.keys(comment_list).length - 1;
      setTimeout(() => {
        const comment_id =
          comment_list[last_index] == null
            ? 0
            : comment_list[last_index].comment_id + 1;
        const created_at = new Date();
        const updated_at = new Date();
        comment_list[comment_id] = {
          rep_id,
          comment_id,
          created_at,
          updated_at,
          user_id,
          text,
          IsReply,
          reply_to: reply_to,
        };
        console.log("comment", comment_list[comment_id]);
        return resolve({ user_id });
      }, 500);
    });
  },
  update_comment: async ({
    user_id,
    comment_id,
    comment,
  }: UpdateCommentParams): Promise<UserId> => {
    comment_list[comment_id] = { ...comment_list[comment_id], ...comment };
    return { user_id };
  },
  delete_comment: async ({
    user_id,
    comment_id,
  }: DeleteCommentParams): Promise<UserId> => {
    delete comment_list[comment_id];
    return { user_id };
  },
  get_rep_comments: function (rep_id: number): Promise<CommentContent[]> {
    let comments: CommentContent[] = [];
    for (const k in comment_list) {
      if (comment_list[k].rep_id === rep_id) comments.push(comment_list[k]);
    }
    return Promise.resolve(comments);
  },
};
export default commentTestApi;
