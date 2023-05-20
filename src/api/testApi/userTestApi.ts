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
    return { ...userList.find((user) => user.id === uid) } as GetUserInfoDto;
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
