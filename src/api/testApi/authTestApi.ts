import {
  AuthApi,
  SignInReturns,
  SignParams,
  SignUpReturns,
} from "../interfacaes/authApi.interface";

import { set_user_info } from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: ({ id, password }: SignParams): SignInReturns => {
    set_user_info({
      user_id: "",
      training_type: "",
      body_weight: NaN,
      height: NaN,
      squat: NaN,
      benchpress: NaN,
      deadlift: NaN,
    });
    let user_id = "";
    let fid = false;
    let ok = false;
    switch (id) {
      case "succ":
        set_user_info({
          user_id: id,
          registered: false,
          nickname: "",
        });
        user_id = id;
        fid = false;
        ok = true;
        break;
      case "succregi":
        set_user_info({
          user_id: id,
          registered: true,
          nickname: "SuccRegi",
          training_type: "bodybuilding",
          body_weight: 88,
          height: 184,
          squat: 190,
          benchpress: 122,
          deadlift: 200,
        });
        user_id = id;
        fid = false;
        ok = true;
        break;
      case "fidd":
        user_id = "";
        fid = true;
        ok = false;
        break;
      default:
        user_id = "";
        fid = false;
        ok = false;
        break;
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
