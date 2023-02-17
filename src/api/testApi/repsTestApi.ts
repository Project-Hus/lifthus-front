import { RepContent, RepsApi } from "../interfacaes/repsApi.interface";
import rep_list from "../mocks/repsTestApi.mocks";
import userTestApi from "./userTestApi";

const repsTestApi: RepsApi = {
  get_user_reps: (user_id: string) => {
    const list = [];
    for (const k in rep_list) {
      if (rep_list[k].user_id === user_id) {
        const next_rep = Object.assign(rep_list[k]);
        next_rep["username"] = userTestApi.get_user_info(user_id).username;
        list.push(next_rep);
      }
    }
    return list;
  },
  post_rep: (user_id: string, rep: RepContent) => {
    return true;
  },
  update_rep: (user_id: string, rep_id: number, rep: RepContent) => {
    return true;
  },
  delete_rep: (user_id: string, rep_id: number) => {
    return true;
  },
};

export default repsTestApi;
