import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterUsernameReturns,
  RegisterParams,
  RegisterReturns,
} from "./interfacaes/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams): RegisterUsernameReturns => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_username({ id, username });
    }
    return { ok: false };
  },
  register: (register_info: RegisterParams): RegisterReturns => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return { ok: false };
  },
};

export default registerApi;
