import { server } from "typescript";
import { app_info } from "../../store/interfaces/app.interface";
import { register_info } from "../../store/interfaces/register.interface";
import {
  authApi_form,
  sign_form,
  sign_in_out,
  sign_up_out,
} from "../interfacaes/authApi.interface";

interface server_user_info {
  user_id: string;
  registered: boolean;
  nickname: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}

export const user_info: server_user_info = {
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

export const set_user_info = (
  user_info: register_info & { user_id: string }
) => {
  user_info = { ...user_info };
};

const authTestApi: authApi_form = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
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
  get_user_info: (id: string): server_user_info => {
    return user_info;
  },
};
export default authTestApi;
