import {
  DeleteRepParams,
  PostRepParams,
  RepContent,
  RepsApi,
  UpdateRepParams,
} from "../interfaces/repsApi.interface";
import { UserId } from "../interfaces/userApi.interface";
import rep_list from "../mocks/repsTestApi.mocks";
import userTestApi from "./userTestApi";

const repsTestApi: RepsApi = {
  get_user_reps: async ({ user_id }: UserId): Promise<RepContent[]> => {
    const list = [];
    for (const _k in rep_list) {
      const k = Number(_k);
      if (rep_list[k].user_id === user_id) {
        const next_rep = Object.assign(rep_list[k]);
        next_rep["username"] = await (
          await userTestApi.get_user_info({ user_id })
        ).username;
        list.push(next_rep);
      }
    }
    return list;
  },
  post_rep: async ({ user_id, rep }: PostRepParams): Promise<UserId> => {
    rep_list[rep.rep_id] = rep;


    return { user_id };
  },
  update_rep: async ({
    user_id,
    rep_id,
    rep,
  }: UpdateRepParams): Promise<UserId> => {
    return { user_id };
  },
  delete_rep: async ({ user_id, rep_id }: DeleteRepParams): Promise<UserId> => {
    delete rep_list[rep_id];
    return { user_id };
  },
};

export default repsTestApi;
