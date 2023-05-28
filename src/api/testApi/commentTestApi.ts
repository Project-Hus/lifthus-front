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
import axios from "axios";
import { LIFTHUS_API_URL } from "../../common/routes";

const commentTestApi: CommentApi = {
  createComment: async (
    comment: CreateCommentDto
  ): Promise<QueryCommentDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, comment, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  createReply: async (reply: CreateReplyDto): Promise<QueryReplyDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(LIFTHUS_API_URL + `/post/comment`, reply, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  updateComment: async (
    comment: UpdateCommentDto
  ): Promise<UpdateCommentResponse> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.put(LIFTHUS_API_URL + `/post/comment`, comment, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  deleteComment: async (cid: number): Promise<DeleteCommentResponse> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.delete(LIFTHUS_API_URL + `/post/comment/${cid}`, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  likeComment: async (cid: number): Promise<number> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(
      LIFTHUS_API_URL + `/post/comment/like/${cid}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
};
export default commentTestApi;
