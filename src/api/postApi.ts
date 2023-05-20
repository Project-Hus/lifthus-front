import axios from "axios";
import {
  DeleteRepParams,
  GetUserPostsParams,
  Post,
  PostRepParams,
  RepContent,
  RepsApi,
  UpdateRepParams,
} from "./interfaces/postApi.interface";
import { UserId } from "./interfaces/userApi.interface";
import repsTestApi from "./testApi/postTestApi";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";
import { UserName } from "./interfaces/userApi.interface";

const repsApi: RepsApi = {
  get_user_reps: async ({ user_id }: UserId) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.get_user_reps({ user_id });
    }
    return repsTestApi.get_user_reps({ user_id });
  },
  getUserPosts: async ({
    username,
    skip = 0,
  }: GetUserPostsParams): Promise<Post[]> => {
    if (process.env.NODE_ENV === "development") {
      return Promise.resolve([]);
    }
    return await axios.get(
      `https://api.lifthus.com/post/query/post/${username}/${skip}`
    );
  },
  post_rep: async ({ user_id, rep }: PostRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.post_rep({ user_id, rep });
    }

    const post: CreatePostDto = {
      author: 0,
      content: rep.text,
    };

    return await axios.post("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
  },
  update_rep: async ({ user_id, rep_id, rep }: UpdateRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.update_rep({ user_id, rep_id, rep });
    }
    const post: UpdatePostDto = {
      id: rep_id,
      author: 0,
      content: rep.text,
    };
    return await axios.put("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
  },
  delete_rep: async ({ uid, pid }: DeleteRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.delete_rep({ uid, pid });
    }
    return await axios.delete("https://api.lifthus.com/post/post", {
      data: { pid },
      withCredentials: true,
    });
  },
};

export default repsApi;
