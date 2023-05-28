import {
  CreateCommentDto,
  CreateReplyDto,
  DeleteCommentResponse,
  QueryCommentDto,
  QueryReplyDto,
  UpdateCommentDto,
  UpdateCommentResponse,
} from "../dtos/comment.dto";
import { Uid } from "./userApi.interface";

// make commentapi interface function
export interface CommentApi {
  createComment: ({
    postId,
    author,
    content,
  }: CreateCommentDto) => Promise<QueryCommentDto>;
  createReply: ({
    parentId,
    author,
    content,
  }: CreateReplyDto) => Promise<QueryReplyDto>;
  updateComment: ({
    id,
    author,
    content,
  }: UpdateCommentDto) => Promise<UpdateCommentResponse>;
  deleteComment: (cid: number) => Promise<DeleteCommentResponse>;
  likeComment: (cid: number) => Promise<number>;
}
