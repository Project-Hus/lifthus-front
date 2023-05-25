import axios from "axios";
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
      `https://api.lifthus.com/post/query/post/${uid}/${skip}`,
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
    return await axios.post("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
  },
  updatePost: async (post: UpdatePostDto) => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.updatePost(post);
    }
    return await axios.put("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
  },
  deletePost: async (pid: number) => {
    if (process.env.NODE_ENV === "development") {
      return postTestApi.deletePost(pid);
    }
    return await axios.delete("https://api.lifthus.com/post/post", {
      data: { pid },
      withCredentials: true,
    });
  },
};

export default postApi;
