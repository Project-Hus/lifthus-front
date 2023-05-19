import axios from "axios";
import {
  DeleteRepParams,
  PostRepParams,
  RepContent,
  RepsApi,
  UpdateRepParams,
} from "./interfaces/repsApi.interface";
import { UserId } from "./interfaces/userApi.interface";
import repsTestApi from "./testApi/repsTestApi";
import { CreatePostDto, UpdatePostDto } from "./dtos/post.dto";

const repsApi: RepsApi = {
  get_user_reps: async ({ user_id }: UserId) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.get_user_reps({ user_id });
    }
    return repsTestApi.get_user_reps({ user_id });
  },
  post_rep: async ({ user_id, rep }: PostRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.post_rep({ user_id, rep });
    }

    const post: CreatePostDto = {
      author: 0,
      content: rep.text,
    };

    await axios.post("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
    return repsTestApi.post_rep({ user_id, rep });
  },
  update_rep: async ({ user_id, rep_id, rep }: UpdateRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.update_rep({ user_id, rep_id, rep });
    }
    const post: UpdatePostDto = {
      id: rep_id,
      author: user_id,
      content: rep.text,
    };
    return await axios.put("https://api.lifthus.com/post/post", post, {
      withCredentials: true,
    });
  },
  delete_rep: async ({ user_id, rep_id }: DeleteRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.delete_rep({ user_id, rep_id });
    }
    return repsTestApi.delete_rep({ user_id, rep_id });
  },
};

export default repsApi;
