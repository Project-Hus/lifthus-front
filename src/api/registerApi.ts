import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../common/routes";
import { GetUserInfoDto } from "./dtos/user.dto";
import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "./interfaces/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  registerUsername: async (
    regiName: RegisterUsernameParams
  ): Promise<GetUserInfoDto> => {
    try {
      if (process.env.NODE_ENV == "development") {
        return registerTestApi.registerUsername(regiName);
      }
      const res = await axios.put(LIFTHUS_AUTH_URL + "/auth/user", regiName, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
  register: async (regiInfo: RegisterParams): Promise<RegisterParams> => {
    try {
      if (process.env.NODE_ENV == "development") {
        return registerTestApi.register(regiInfo);
      }
      const res = await axios.post(LIFTHUS_AUTH_URL + "/auth/user", regiInfo, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
};

export default registerApi;
