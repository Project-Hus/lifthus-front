import { RepContent, RepsApi } from "./interfacaes/repsApi.interface";
import repsTestApi from "./testApi/repsTestApi";

const repsApi: RepsApi = {
  get_user_reps: (user_id: string) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.get_user_reps(user_id);
    }
    return repsTestApi.get_user_reps(user_id);
  },
  post_rep: (user_id: string, rep: RepContent) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.post_rep(user_id, rep);
    }
    return repsTestApi.post_rep(user_id, rep);
  },
  update_rep: (user_id: string, rep_id: number, rep: RepContent) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.update_rep(user_id, rep_id, rep);
    }
    return repsTestApi.update_rep(user_id, rep_id, rep);
  },
  delete_rep: (user_id: string, rep_id: number) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.delete_rep(user_id, rep_id);
    }
    return repsTestApi.delete_rep(user_id, rep_id);
  },
};

export default repsApi;
