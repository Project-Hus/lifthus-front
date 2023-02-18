import { AuthApi, SignParams } from "./interfacaes/authApi.interface";
import { UserId } from "./interfacaes/userApi.interface";

import authTestApi from "./testApi/authTestApi";

const authApi: AuthApi = {
  sign_in_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ user_id, password });
    }
    return authTestApi.sign_in_local({ user_id, password });
  },
  sign_up_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return authTestApi.sign_up_local({ user_id, password });
    }
    return authTestApi.sign_up_local({ user_id, password });
  },
};

export default authApi;
