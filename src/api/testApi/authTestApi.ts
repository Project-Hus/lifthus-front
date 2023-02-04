import {
  authApi_form,
  get_user_info_form,
  sign_form,
  sign_in_out,
  sign_up_out,
} from "../interfacaes/authApi.interface";
import { register_form } from "../interfacaes/registerApi.interface";

export let user_info: get_user_info_form = {
  user_id: "",
  registered: false,
  nickname: "",
  training_type: "",
  body_weight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
};

export const set_user_info = (register_user_info: register_form) => {
  user_info = { ...user_info, ...register_user_info };
};

const authTestApi: authApi_form = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
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
        user_info.user_id = id;
        user_info.registered = false;
        user_info.nickname = "";
        user_id = user_info.user_id;
        fid = false;
        ok = true;
        break;
      case "succregi":
        user_info.user_id = "succregi";
        user_info.registered = true;
        user_info.nickname = "SuccRegi";
        user_info.training_type = "bodybuilding";
        user_info.body_weight = 88;
        user_info.height = 184;
        user_info.squat = 190;
        user_info.benchpress = 122;
        user_info.deadlift = 200;
        user_id = user_info.user_id;
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

  sign_up_local: ({ id, password }: sign_form): sign_up_out => {
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
  get_user_info: (id: string): get_user_info_form => {
    return { ...user_info };
  },
};
export default authTestApi;
