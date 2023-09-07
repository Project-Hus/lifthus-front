import axios, { AxiosResponse } from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import {
  CreatePostDto,
  CreatePostDtoInput,
  PostDto,
  UpdatePostDto,
  UpdatePostDtoInput,
} from "./dtos/post.dto";
import { PostSumamryJSON, PostSummaryDto } from "./dtos/postSummary.dto";
import { GetUserPostsParams, PostApi } from "./interfaces/postApi.interface";

import statusInfo from "./interfaces/statusInfo.json";

const postApi: PostApi = {
  getPost: async ({ pid, slug }: { pid?: string; slug?: string }) => {
    let res: AxiosResponse<any, any>;
    if (pid) {
      res = await axios.get(LIFTHUS_API_URL + `/post/query/post/id/${pid}`);
    } else if (slug) {
      res = await axios.get(LIFTHUS_API_URL + `/post/query/post/slug/${slug}`);
    } else {
      return Promise.reject("Invalid parameters");
    }
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    else if (res.status === statusInfo.fail.NotFound.code) return null;
    return res.data;
  },
  getAllPosts: async (skip?: number): Promise<PostSummaryDto[]> => {
    if (!skip) skip = 0;
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/post/all?skip=${skip}`
    );
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    const postSumms: PostSummaryDto[] = res.data.map(
      (p: PostSumamryJSON) => new PostSummaryDto(p)
    );
    return postSumms;
  },
  getUsersPosts: async ({ users, skip = 0 }): Promise<PostSummaryDto[]> => {
    const usersQ = users.join(",");
    const res = await axios.get(LIFTHUS_API_URL + `/post/query/post`, {
      params: { users: usersQ, skip },
      withCredentials: true,
    });
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    const postSumms: PostSummaryDto[] = res.data.map(
      (p: PostSumamryJSON) => new PostSummaryDto(p)
    );
    return postSumms;
  },
  createPost: async (post: CreatePostDtoInput): Promise<PostDto> => {
    const newPostForm = CreatePostDto.create(post);
    const res = await axios.post(LIFTHUS_API_URL + "/post/post", newPostForm, {
      withCredentials: true,
    });

    if (res.status !== statusInfo.succ.Created.code)
      throw Promise.reject("failed to create post");

    return res.data;
  },
  updatePost: async (post: UpdatePostDtoInput) => {
    console.log(post);
    const updatePostForm = new UpdatePostDto(post);
    console.log(updatePostForm);
    const res = await axios.put(
      LIFTHUS_API_URL + "/post/post",
      updatePostForm,
      {
        withCredentials: true,
      }
    );
    if (res.status !== statusInfo.succ.Ok.code)
      throw Promise.reject("failed to update post");
    return new PostDto(res.data);
  },
  deletePost: async (pid: string) => {
    const res = await axios.delete(LIFTHUS_API_URL + "/post/post/" + pid, {
      data: { pid },
      withCredentials: true,
    });
    return res.data;
  },
  likePost: async (pid: string) => {
    const res = await axios.post(
      LIFTHUS_API_URL + `/post/like/post/${pid}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};

export default postApi;
