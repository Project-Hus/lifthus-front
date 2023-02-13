import { Rep, RepsApi } from "./interfacaes/repsApi.interface";
import repsTestApi from "./testApi/repsTestApi";

const repsApi: RepsApi = {
  get_user_reps: (user_id: string) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.get_user_reps(user_id);
    }
    return [];
  },
  post_rep: (user_id: string, rep: Rep) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.post_rep(user_id, rep);
    }
    return true;
  },
  update_rep: (user_id: string, rep_id: number, rep: Rep) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.update_rep(user_id, rep_id, rep);
    }
    return true;
  },
  delete_rep: (user_id: string, rep_id: number) => {
    if (process.env.NODE_ENV === "development") {
      return repsTestApi.delete_rep(user_id, rep_id);
    }
    return true;
  },
};

export default repsApi;
