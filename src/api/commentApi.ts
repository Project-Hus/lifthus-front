//make commentApi
import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
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
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.createComment(comment);
    // }
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, comment, {
      withCredentials: true,
    });
    return res.data;
  },

  createReply: async (reply: CreateReplyDto): Promise<QueryReplyDto> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.createReply(reply);
    // }
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, reply, {
      withCredentials: true,
    });
    return res.data;
  },

  updateComment: async (
    comment: UpdateCommentDto
  ): Promise<UpdateCommentResponse> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.updateComment(comment);
    // }
    const res = await axios.put(LIFTHUS_API_URL + `/post/comment`, comment, {
      withCredentials: true,
    });
    return res.data;
  },
  deleteComment: async (cid: number): Promise<DeleteCommentResponse> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.deleteComment(cid);
    // }
    const res = await axios.delete(LIFTHUS_API_URL + `/post/comment/${cid}`, {
      withCredentials: true,
    });
    return res.data;
  },
  likeComment: async (cid: number): Promise<number> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.likeComment(cid);
    // }
    const res = await axios.post(
      LIFTHUS_API_URL + `/post/comment/like/${cid}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};
export default commentApi;
