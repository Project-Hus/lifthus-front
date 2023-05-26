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
