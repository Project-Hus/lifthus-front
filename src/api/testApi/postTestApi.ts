import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";
import { GetUserPostsParams, PostApi } from "../interfaces/postApi.interface";
import postList, { postState } from "../mocks/postApi.mock";
import userTestApi from "./userTestApi";
import statusInfo from "../interfaces/statusInfo.json";
import { SigningState } from "../mocks/state.mcok";
import commentList, { replyList } from "../mocks/commentApi.mock";
import axios from "axios";

const postTestApi: PostApi = {
  getUserPosts: async ({
    uid,
    skip = 0,
  }: GetUserPostsParams): Promise<QueryPostDto[]> => {
    const res = await axios.get(
      `https://api.lifthus.com/post/query/post/${uid}/${skip}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },

  createPost: async (post: CreatePostDto): Promise<QueryPostDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },

  updatePost: async (post: UpdatePostDto): Promise<UpdatePostResponse> => {
    if (SigningState.uid !== post.author)
      return Promise.reject(statusInfo.fail.Unauthorized);
    const pidx = postList.findIndex((p) => p.id === post.id);
    postList[pidx] = { ...postList[pidx], ...post };
    return { count: 1 };
  },
  deletePost: async (pid): Promise<DeletePostResponse> => {
    if (!SigningState.uid) return Promise.reject(statusInfo.fail.Unauthorized);
    const pidx = postList.findIndex(
      (p) => p.id === pid && p.author === SigningState.uid
    );
    if (pidx === -1) return Promise.reject(statusInfo.fail.NotFound);
    postList.splice(pidx, 1);
    return { count: 1 };
  },
};

export default postTestApi;
