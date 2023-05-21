//make testapi for comment
import {
  CreateCommentDto,
  CreateReplyDto,
  DeleteCommentResponse,
  QueryCommentDto,
  QueryReplyDto,
  UpdateCommentDto,
  UpdateCommentResponse,
} from "../dtos/comment.dto";
import { CommentApi } from "../interfaces/commentApi.interface";
import comment_list, {
  commentList,
  commentState,
  replyList,
} from "../mocks/commentApi.mock";
import { SigningState } from "../mocks/state.mcok";

import statusInfo from "../interfaces/statusInfo.json";
import Sign from "../../pages/sign/Sign";

const commentTestApi: CommentApi = {
  createComment: async (
    comment: CreateCommentDto
  ): Promise<QueryCommentDto> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (SigningState.uid !== comment.author)
          return Promise.reject(statusInfo.fail.Unauthorized);
        const newComment: QueryCommentDto = {
          id: commentState.nextCid,
          postId: comment.postId,
          author: SigningState.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
          content: comment.content,
          likenum: 0,
          mentions: [],
        };
        commentList.push(newComment);
        commentState.nextCid += 1;
      }, 500);
    });
  },
  createReply: async (reply: CreateReplyDto): Promise<QueryReplyDto> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (SigningState.uid !== reply.author)
          return Promise.reject(statusInfo.fail.Unauthorized);
        const newReply: QueryReplyDto = {
          id: commentState.nextCid,
          parentId: reply.parentId,
          author: SigningState.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
          content: reply.content,
          likenum: 0,
          mentions: [],
        };
        replyList.push(newReply);
        commentState.nextCid += 1;
      }, 500);
    });
  },
  updateComment: async (
    comment: UpdateCommentDto
  ): Promise<UpdateCommentResponse> => {
    if (SigningState.uid !== comment.author)
      return Promise.reject(statusInfo.fail.Unauthorized);
    let cidx = commentList.findIndex(
      (c) => c.id === comment.id && c.author === comment.author
    );
    if (cidx == -1) {
      cidx = replyList.findIndex(
        (c) => c.id === comment.id && c.author === comment.author
      );
      if (cidx == -1) return Promise.reject(statusInfo.fail.Unauthorized);
      replyList[cidx].content = comment.content;
    } else {
      commentList[cidx].content = comment.content;
    }
    return { count: 1 };
  },
  deleteComment: async (cid: number): Promise<DeleteCommentResponse> => {
    let cidx = commentList.findIndex(
      (c) => c.id === cid && c.author === SigningState.uid
    );
    if (cidx == -1) {
      cidx = replyList.findIndex(
        (c) => c.id === cid && c.author === SigningState.uid
      );
      if (cidx == -1) return { count: 0 };
      replyList.splice(cidx, 1);
    } else {
      commentList.splice(cidx, 1);
    }
    return { count: 1 };
  },
};
export default commentTestApi;
