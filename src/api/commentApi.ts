//make commentApi
import {
  CreateCommentDto,
  CreateReplyDto,
  DeleteCommentResponse,
  QueryCommentDto,
  QueryReplyDto,
  UpdateCommentDto,
  UpdateCommentResponse,
} from "./dtos/comment.dto";

import { CommentApi } from "./interfaces/commentApi.interface";

import commentTestApi from "./testApi/commentTestApi";

const commentApi: CommentApi = {
  createComment: async (
    comment: CreateCommentDto
  ): Promise<QueryCommentDto> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.createComment(comment);
    }
    return commentTestApi.createComment(comment);
  },

  createReply: async (reply: CreateReplyDto): Promise<QueryReplyDto> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.createReply(reply);
    }
    return commentTestApi.createReply(reply);
  },

  updateComment: async (
    comment: UpdateCommentDto
  ): Promise<UpdateCommentResponse> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.updateComment(comment);
    }
    return commentTestApi.updateComment(comment);
  },
  deleteComment: async (cid: number): Promise<DeleteCommentResponse> => {
    if (process.env.NODE_ENV === "development") {
      return commentTestApi.deleteComment(cid);
    }
    return commentTestApi.deleteComment(cid);
  },
};
export default commentApi;
