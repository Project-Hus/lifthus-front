import {
  sign_form,
  sign_in_out,
  sign_up_out,
} from "./interfacaes/authApi.interface";

import authTestApi from "./testApi/authTestApi";

const authApi: any = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ id, password });
    }
    return { id: "", fid: false, ok: false };
  },
  sign_up_local: ({ id, password }: sign_form): sign_up_out => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_up_local({ id, password });
    }
    return { fid: false, ok: false };
  },
};

export default authApi;
