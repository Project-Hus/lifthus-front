//make commentApi
import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import {
  CommentDto,
  CommentJSON,
  CreateCommentDto,
  CreateReplyDto,
  DeleteCommentResponse,
  UpdateCommentDto,
  UpdateCommentResponse,
} from "./dtos/comment.dto";

import { CommentApi } from "./interfaces/commentApi.interface";

const commentApi: CommentApi = {
  getComments: async (pid: string): Promise<CommentDto[]> => {
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/comment?pid=${pid}`,
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error("getComments failed");
    const comments = res.data.map((c: CommentJSON) => new CommentDto(c));
    return comments;
  },
  createComment: async (comment: CreateCommentDto): Promise<CommentDto> => {
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, comment, {
      withCredentials: true,
    });
    if (res.status !== 201) throw new Error("createComment failed");
    return res.data;
  },

  createReply: async (reply: CreateReplyDto): Promise<CommentDto> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.createReply(reply);
    // }
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, reply, {
      withCredentials: true,
    });

    if (res.status !== 201) throw new Error("createReply failed");
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
    if (res.status !== 200) throw new Error("updateComment failed");
    return res.data;
  },
  deleteComment: async (cid: string): Promise<DeleteCommentResponse> => {
    // if (process.env.NODE_ENV === "development") {
    //   return commentTestApi.deleteComment(cid);
    // }
    const res = await axios.delete(LIFTHUS_API_URL + `/post/comment/${cid}`, {
      withCredentials: true,
    });
    if (res.status !== 200) throw new Error("deleteComment failed");
    return res.data;
  },
  likeComment: async (cid: string): Promise<number> => {
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
