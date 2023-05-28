import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreatePostDto, QueryPostDto, UpdatePostDto } from "./dtos/post.dto";
import { GetUserPostsParams, PostApi } from "./interfaces/postApi.interface";
import postTestApi from "./testApi/postTestApi";

const postApi: PostApi = {
  getUserPosts: async ({
    uid,
    skip = 0,
  }: GetUserPostsParams): Promise<QueryPostDto[]> => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.getUserPosts({ uid, skip });
    }
    const res = await axios.get(
      LIFTHUS_API_URL + `/post/query/post/user/${uid}/${skip}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  createPost: async (post: CreatePostDto): Promise<QueryPostDto> => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.createPost(post);
    }
    const res = await axios.post("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
    return res.data;
  },
  updatePost: async (post: UpdatePostDto) => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.updatePost(post);
    }
    const res = await axios.put("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
    return res.data;
  },
  deletePost: async (pid: number) => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.deletePost(pid);
    }
    const res = await axios.delete("https://api.lifthus.com/post/post/" + pid, {
      data: { pid },
      withCredentials: true,
    });
    return res.data;
  },
  likePost: async (pid: number) => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.likePost(pid);
    }
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
