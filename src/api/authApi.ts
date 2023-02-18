import {
  AuthApi,
  SignInReturns,
  SignParams,
  SignUpReturns,
} from "./interfacaes/authApi.interface";

import authTestApi from "./testApi/authTestApi";

const authApi: AuthApi = {
  sign_in_local: async ({
    id,
    password,
  }: SignParams): Promise<SignInReturns> => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ id, password });
    }
    return authTestApi.sign_in_local({ id, password });
  },
  sign_up_local: async ({
    id,
    password,
  }: SignParams): Promise<SignUpReturns> => {
    if (process.env.NODE_ENV === "development") {
      return authTestApi.sign_up_local({ id, password });
    }
    return authTestApi.sign_up_local({ id, password });
  },
};

export default authApi;
