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
    try {
      const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/user/" + uid, {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem("lifthus_st"),
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
  getIdByName: async ({ username }: Username): Promise<Uid> => {
    const user = userList.find((user) => user.username === username);
    if (user) return { uid: user.id };
    return Promise.reject(statusInfo.fail.Conflict);
  },
  getNameById: async ({ uid }: Uid): Promise<Username> => {
    const user = userList.find((user) => user.id === uid);
    if (user && user.username) return { username: user.username };
    return Promise.reject(statusInfo.fail.Conflict);
  },
};
export default userTestApi;
