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
  getPost: async ({ pid, slug }: { pid?: number; slug?: string }) => {
    let res: AxiosResponse<any, any>;
    if (pid) {
      res = await axios.get(LIFTHUS_API_URL + `/post/query/post/id/${pid}`);
    } else if (slug) {
      res = await axios.get(LIFTHUS_API_URL + `/post/query/post/slug/${slug}`);
    } else {
      return Promise.reject("Invalid parameters");
    }
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
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
  getUserPosts: async ({
    uid,
    skip = 0,
  }: GetUserPostsParams): Promise<PostSummaryDto[]> => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.getUserPosts({ uid, skip });
    // }
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/post/user/${uid}/${skip}`,
      {
        withCredentials: true,
      }
    );
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    const postSumms: PostSummaryDto[] = res.data.map(
      (p: PostSumamryJSON) => new PostSummaryDto(p)
    );
    return postSumms;
  },
  getUsersPosts: async ({ users, skip = 0 }): Promise<PostSummaryDto[]> => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.getUsersPosts({ users, skip });
    // }
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
    console.log(newPostForm);
    const res = await axios.post(LIFTHUS_API_URL + "/post/post", newPostForm, {
      withCredentials: true,
    });

    if (res.status !== statusInfo.succ.Created.code)
      throw Promise.reject("failed to create post");

    return res.data;
  },
  updatePost: async (post: UpdatePostDtoInput) => {
    const updatedPostForm = UpdatePostDto.create(post);
    const res = await axios.put(
      LIFTHUS_API_URL + "/post/post",
      updatedPostForm,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  deletePost: async (pid: number) => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.deletePost(pid);
    // }
    const res = await axios.delete(LIFTHUS_API_URL + "/post/post/" + pid, {
      data: { pid },
      withCredentials: true,
    });
    return res.data;
  },
  likePost: async (pid: number) => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.likePost(pid);
    // }
    const res = await axios.post(
      LIFTHUS_API_URL + `/post/post/like/${pid}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};

export default postApi;
