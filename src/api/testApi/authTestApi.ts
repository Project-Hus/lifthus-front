import { app_info } from "../../store/interfaces/app.interface";
import {
  sign_form,
  sign_in_out,
  sign_up_out,
} from "../interfacaes/authApi.interface";

const authTestApi: any = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
    let user_id = "";
    let fid = false;
    let ok = false;
    switch (id) {
      case "succ":
        user_id = "succ";
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
  get_user_info: (id: string): app_info => {
    const registered = id === "succregi" ? true : false;
    return { user_id: id, registered };
  },
};
export default authTestApi;
