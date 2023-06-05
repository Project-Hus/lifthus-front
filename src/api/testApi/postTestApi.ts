import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";
import { GetUserPostsParams, PostApi } from "../interfaces/postApi.interface";
import axios from "axios";
import { LIFTHUS_API_URL } from "../../common/routes";

const postTestApi: PostApi = {
  getUserPosts: async ({
    uid,
    skip = 0,
  }: GetUserPostsParams): Promise<QueryPostDto[]> => {
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/post/user/${uid}/${skip}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  getUsersPosts: async ({ users, skip = 0 }): Promise<QueryPostDto[]> => {
    const lst = localStorage.getItem("lifthus_st");
    const usersQ = users.join(",");
    const res = await axios.get(LIFTHUS_API_URL + `/post/query/post`, {
      params: { users: usersQ, skip },
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
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
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.put("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  deletePost: async (pid): Promise<DeletePostResponse> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.delete("https://api.lifthus.com/post/post/" + pid, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  likePost: async (pid: number) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(
      LIFTHUS_API_URL + `/post/post/like/${pid}`,
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

export default postTestApi;
