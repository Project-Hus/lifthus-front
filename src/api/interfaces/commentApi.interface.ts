import { UserId } from "./userApi.interface";
import { RepContent } from "./repsApi.interface";

// make commentapi interface function
export interface CommentApi {
  get_user_comments: ({ user_id }: UserId) => Promise<CommentContent[]>;

  post_comment: ({
    user_id,
    text,
    rep_id,
    IsReply,
    reply_to,
  }: PostCommentParams) => Promise<UserId>;

  update_comment: ({
    user_id,
    comment_id,
    comment,
  }: UpdateCommentParams) => Promise<UserId>;
  delete_comment: ({
    user_id,
    comment_id,
  }: DeleteCommentParams) => Promise<UserId>;
  get_rep_comments: (rep_id: number) => Promise<CommentContent[]>;
  get_reply_comments: (comment_id: number) => Promise<CommentContent[]>;
}

//make comment interface function parameter
export interface PostCommentParams {
  user_id: string;

  text: string;
  rep_id: number;
  IsReply: boolean;
  reply_to?: number;
}
export interface UpdateCommentParams {
  user_id: string;
  comment_id: number;
  comment: CommentContent;
}
export interface DeleteCommentParams {
  user_id: string;
  comment_id: number;
}

//make comment interface content
export interface CommentContent {
  rep_id: number;
  comment_id: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  routine_id?: number;
  image_paths?: string[];
  text: string;

  IsReply: boolean;
  //답글일 경우에만 존재
  //해당 답글이 달린 댓글의 comment_id 저장
  reply_to?: number;
}
