import { GetUserInfoDto } from "../dtos/user.dto";
import {
  SetUserInfoParams,
  Uid,
  UserApi,
  Username,
} from "../interfaces/userApi.interface";
import userList from "../mocks/userTestApi.mock";
import statusInfo from "../interfaces/statusInfo.json";
import user_list from "../mocks/userTestApi.mock";
import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../../common/routes";

const userTestApi: UserApi = {
  setUserinfo: async ({
    uid,
    newUserinfo,
  }: SetUserInfoParams): Promise<Uid> => {
    const uidx = userList.findIndex((user) => user.id === uid);
    userList[uidx] = { ...user_list[uidx], ...newUserinfo };
    return { uid };
  },
  getUserInfo: async ({ uid }: Uid): Promise<GetUserInfoDto> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/" + uid, {
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
      LIFTHUS_AUTH_URL + "/auth/username/" + username,
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
