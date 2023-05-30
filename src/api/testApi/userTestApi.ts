import { GetUserInfoDto } from "../dtos/user.dto";
import {
  SetUserInfoParams,
  Uid,
  UserApi,
  Username,
} from "../interfaces/userApi.interface";

import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../../common/routes";

const userTestApi: UserApi = {
  setUserinfo: async ({
    uid,
    newUserinfo,
  }: SetUserInfoParams): Promise<Uid> => {
    return Promise.reject("not implemented");
  },
  getUserInfo: async ({ uid }: Uid): Promise<GetUserInfoDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/info/" + uid, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  getUserInfoByUsername: async ({
    username,
  }: Username): Promise<GetUserInfoDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/username/info/" + username,
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
};
export default userTestApi;
