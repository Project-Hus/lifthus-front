import {
  DeleteRepParams,
  PostRepParams,
  RepContent,
  RepsApi,
  UpdateRepParams,
} from "./interfaces/repsApi.interface";
import { UserId } from "./interfaces/userApi.interface";
import repsTestApi from "./testApi/repsTestApi";

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
    return repsTestApi.post_rep({ user_id, rep });
  },
  update_rep: async ({ user_id, rep_id, rep }: UpdateRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.update_rep({ user_id, rep_id, rep });
    }
    return repsTestApi.update_rep({ user_id, rep_id, rep });
  },
  delete_rep: async ({ user_id, rep_id }: DeleteRepParams) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.delete_rep({ user_id, rep_id });
    }
    return repsTestApi.delete_rep({ user_id, rep_id });
  },
};

export default repsApi;
