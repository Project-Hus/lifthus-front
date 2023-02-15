import {
  AuthApi,
  SignInReturns,
  SignParams,
  SignUpReturns,
} from "../interfacaes/authApi.interface";
import user_list from "../mocks/userTestApi.mocks";

import { set_user_info } from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: ({ id, password }: SignParams): SignInReturns => {
    let user_id = "";
    let fid = false;
    let ok = false;
    if (id in user_list) {
    }
    return { user_id, fid, ok };
  },

  sign_up_local: ({ id, password }: SignParams): SignUpReturns => {
    let fid = false;
    let ok = false;
    switch (id) {
      case "succ":
        fid = false;
        ok = true;
        break;
      case "fidd":
        fid = true;
        ok = false;
        break;
      default:
        fid = false;
        ok = false;
        break;
    }
    return { fid, ok };
  },
};
export default authTestApi;
