import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "./interfaces/registerApi.interface";
import { Uid, Username } from "./interfaces/userApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  registerUsername: async ({
    uid,
    username,
  }: RegisterUsernameParams): Promise<Username> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.registerUsername({ uid, username });
    }
    return registerTestApi.registerUsername({ uid, username });
  },
  register: async (register_info: RegisterParams): Promise<Uid> => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return registerTestApi.register(register_info);
  },
};

export default registerApi;
