import axios, { AxiosResponse } from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import {
  CreatePostDto,
  QueryPostDto,
  PostSummary,
  UpdatePostDto,
} from "./dtos/post.dto";
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
  getAllPosts: async (skip?: number): Promise<PostSummary[]> => {
    if (!skip) skip = 0;
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/post/all?skip=${skip}`
    );
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    return res.data || [];
  },
  getUserPosts: async ({
    uid,
    skip = 0,
  }: GetUserPostsParams): Promise<PostSummary[]> => {
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
    return res.data || [];
  },
  getUsersPosts: async ({ users, skip = 0 }): Promise<PostSummary[]> => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.getUsersPosts({ users, skip });
    // }
    const usersQ = users.join(",");
    const res = await axios.get(LIFTHUS_API_URL + `/post/query/post`, {
      params: { users: usersQ, skip },
      withCredentials: true,
    });
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject(res.data);
    return res.data;
  },
  createPost: async (post: CreatePostDto): Promise<QueryPostDto> => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.createPost(post);
    // }
    post.images = post.images || [];
    const newPostForm = new FormData();

    newPostForm.append("author", JSON.stringify(post.author));
    newPostForm.append("content", post.content);
    for (const img of post.images) {
      newPostForm.append("images", img);
    }

    const res = await axios.post(LIFTHUS_API_URL + "/post/post", newPostForm, {
      withCredentials: true,
    });

    if (res.status !== statusInfo.succ.Created.code)
      throw Promise.reject("failed to create post");

    return res.data;
  },
  updatePost: async (post: UpdatePostDto) => {
    // if (process.env.NODE_ENV === "development") {
    //   return postTestApi.updatePost(post);
    // }
    const res = await axios.put(LIFTHUS_API_URL + "/post/post", post, {
      withCredentials: true,
    });
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
