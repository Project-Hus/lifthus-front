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
    return await axios.get(
      `https://api.lifthus.com/post/query/post/${uid}/${skip}`
    );
  },

  createPost: async (post: CreatePostDto): Promise<QueryPostDto> => {
    if (!SigningState.uid) return Promise.reject(statusInfo.fail.Unauthorized);
    const newPost: QueryPostDto = {
      id: postState.nextPid,
      author: SigningState.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: new Date().getTime().toString(),
      images: [],
      content: post.content,
      likenum: 0,
      mentions: [],
    };
    postList.push(newPost);
    postState.nextPid += 1;
    return newPost;
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
