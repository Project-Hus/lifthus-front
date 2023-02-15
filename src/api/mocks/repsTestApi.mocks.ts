import { Rep, RepsApi } from "../interfacaes/repsApi.interface";

const repsTestApi: RepsApi = {
  get_user_reps: (user_id: string) => {
    return [];
  },
  post_rep: (user_id: string, rep: Rep) => {
    return true;
  },
  update_rep: (user_id: string, rep_id: number, rep: Rep) => {
    return true;
  },
  delete_rep: (user_id: string, rep_id: number) => {
    return true;
  },
};

export default repsTestApi;
