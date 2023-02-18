import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "./interfacaes/registerApi.interface";
import { UserId } from "./interfacaes/userApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  register_username: async ({
    user_id,
    username,
  }: RegisterUsernameParams): Promise<UserId> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_username({ user_id, username });
    }
    return registerTestApi.register_username({ user_id, username });
  },
  register: async (register_info: RegisterParams): Promise<UserId> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return registerTestApi.register(register_info);
  },
};

export default registerApi;
