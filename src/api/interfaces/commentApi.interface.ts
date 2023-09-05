import {
  CommentDto,
  CreateCommentDto,
  CreateReplyDto,
  DeleteCommentResponse,
  UpdateCommentDto,
  UpdateCommentResponse,
} from "../dtos/comment.dto";
import { Uid } from "./userApi.interface";

// make commentapi interface function
export interface CommentApi {
  getComments: (pid: string) => Promise<CommentDto[]>;
  createComment: ({
    postId,
    author,
    content,
  }: CreateCommentDto) => Promise<CommentDto>;
  createReply: ({
    parentId,
    author,
    content,
  }: CreateReplyDto) => Promise<CommentDto>;
  updateComment: ({
    id,
    author,
    content,
  }: UpdateCommentDto) => Promise<UpdateCommentResponse>;
  deleteComment: (cid: string) => Promise<DeleteCommentResponse>;
  likeComment: (cid: string) => Promise<number>;
}
