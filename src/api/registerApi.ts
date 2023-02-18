import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterUsernameReturns,
  RegisterParams,
  RegisterReturns,
} from "./interfacaes/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  register_username: async ({
    id,
    username,
  }: RegisterUsernameParams): Promise<RegisterUsernameReturns> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_username({ id, username });
    }
    return registerTestApi.register_username({ id, username });
  },
  register: async (register_info: RegisterParams): Promise<RegisterReturns> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return registerTestApi.register(register_info);
  },
};

export default registerApi;
