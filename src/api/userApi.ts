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
      return userTestApi.getUserInfo({ uid });
    }
    return userTestApi.getUserInfo({ uid });
  },
  getIdByName: async ({ username }: Username): Promise<Uid> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.getIdByName({ username });
    }
    return userTestApi.getIdByName({ username });
  },
  getNameById: async ({ uid }: Uid): Promise<Username> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.getNameById({ uid });
    }
    return userTestApi.getNameById({ uid });
  },
};

export default userApi;
