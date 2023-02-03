import { app_info } from "../store/interfaces/app.interface";
import {
  authApi_form,
  get_user_info_form,
  sign_form,
  sign_in_out,
  sign_up_out,
} from "./interfacaes/authApi.interface";

import authTestApi from "./testApi/authTestApi";

const authApi: authApi_form = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ id, password });
    }
    return { user_id: "", fid: false, ok: false };
  },
  sign_up_local: ({ id, password }: sign_form): sign_up_out => {
    if (process.env.NODE_ENV === "development") {
      return authTestApi.sign_up_local({ id, password });
    }
    return { fid: false, ok: false };
  },
  get_user_info: (id: string): get_user_info_form => {
    if (process.env.NODE_ENV === "development") {
      return authTestApi.get_user_info(id);
    }
    return authTestApi.get_user_info(id);
  },
};

export default authApi;
