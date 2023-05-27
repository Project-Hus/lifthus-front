import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../common/routes";
import { GetUserInfoDto } from "./dtos/user.dto";
import {
  SetUserInfoParams,
  Uid,
  UserApi,
  Username,
} from "./interfaces/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  setUserinfo: async (user: SetUserInfoParams) => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.setUserinfo(user);
    }
    return userTestApi.setUserinfo(user);
  },
  getUserInfo: async ({ uid }: Uid): Promise<GetUserInfoDto> => {
    if (process.env.NODE_ENV === "development") {
      return await userTestApi.getUserInfo({ uid });
    }
    const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/" + uid, {
      withCredentials: true,
    });
    return res.data;
  },
  getUserInfoByUsername: async ({
    username,
  }: Username): Promise<GetUserInfoDto> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.getUserInfoByUsername({ username });
    }
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/username/" + username,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};

export default userApi;
