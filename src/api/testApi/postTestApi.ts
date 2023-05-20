import {
  DeleteRepParams,
  Post,
  PostApi,
  PostRepParams,
  RepContent,
  RepsApi,
  UpdateRepParams,
} from "../interfaces/postApi.interface";
import { UserId } from "../interfaces/userApi.interface";
import rep_list from "../mocks/postTestApi.mock";
import userTestApi from "./userTestApi";
let counter = 100;
const postTestApi: PostApi = {
  get_user_reps: async ({ user_id }: UserId): Promise<RepContent[]> => {
    const list = [];
    for (const _k in rep_list) {
      const k = Number(_k);
      if (rep_list[k].id === user_id) {
        const next_rep = Object.assign(rep_list[k]);
        next_rep["username"] = await (
          await userTestApi.get_user_info({ user_id })
        ).username;
        list.push(next_rep);
      }
    }
    return list;
  },

  getUserPosts: async (): Promise<Post[]> => {
    console.log("getUserPosts not implemented");
    return Promise.resolve([]);
  },

  post_rep: async ({ user_id, rep }: PostRepParams): Promise<UserId> => {
    rep_list[counter++] = rep;

    return { user_id };
  },
  update_rep: async ({
    user_id,
    rep_id,
    rep,
  }: UpdateRepParams): Promise<UserId> => {
    rep_list[rep_id] = rep;
    return { user_id };
  },
  delete_rep: async ({ uid, pid }: DeleteRepParams): Promise<UserId> => {
    delete rep_list[pid];
    console.log("rep_list", rep_list);
    return { user_id: uid.toString() };
  },
};

export default postTestApi;
