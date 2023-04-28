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

let counter = 10;
const Comment_list: { [key: number]: CommentContent } = comment_list;
const commentTestApi: CommentApi = {
  get_user_comments: async ({ user_id }: UserId): Promise<CommentContent[]> => {
    let comments: CommentContent[] = [];
    for (const k in Comment_list) {
      if (Comment_list[k].user_id === user_id) comments.push(Comment_list[k]);
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
      //Temperliy comment_id started at 10
      counter++;
      setTimeout(() => {
        console.log("comment list", Comment_list);
        const created_at = new Date();
        const updated_at = new Date();
        Comment_list[counter] = {
          rep_id: rep_id,
          comment_id: counter,
          created_at,
          updated_at,
          user_id,
          text,
          IsReply,
          reply_to: reply_to,
        };
        console.log("comment", Comment_list[counter]);
        return resolve({ user_id });
      }, 500);
    });
  },
  update_comment: async ({
    user_id,
    comment_id,
    comment,
  }: UpdateCommentParams): Promise<UserId> => {
    Comment_list[comment_id] = { ...Comment_list[comment_id], ...comment };
    return { user_id };
  },
  delete_comment: async ({
    user_id,
    comment_id,
  }: DeleteCommentParams): Promise<UserId> => {
    delete Comment_list[comment_id];
    return { user_id };
  },
  get_rep_comments: function (rep_id: number): Promise<CommentContent[]> {
    let comments: CommentContent[] = [];
    for (const k in Comment_list) {
      if (Comment_list[k].rep_id === rep_id && Comment_list[k].IsReply == false)
        comments.push(Comment_list[k]);
    }
    return Promise.resolve(comments);
  },
  get_reply_comments: function (comment_id: number): Promise<CommentContent[]> {
    let comments: CommentContent[] = [];

    for (const k in Comment_list) {
      if (Comment_list[k].reply_to === comment_id) {
        comments.push(Comment_list[k]);
      }
    }
    return Promise.resolve(comments);
  },
};
export default commentTestApi;
