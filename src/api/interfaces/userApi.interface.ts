import { GetUserInfoDto } from "../dtos/user.dto";
import { UserProfileDB } from "../mocks/userTestApi.mock";
import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  setUserinfo: ({ uid, new_user_info }: SetUserInfoParams) => Promise<Uid>;
  getUserInfo: ({ uid }: Uid) => Promise<GetUserInfoDto>;
  getIdByName: ({ username }: Username) => Promise<Uid>;
}
export interface SetUserInfoParams {
  uid: number;
  new_user_info: RegisterParams | UserProfileDB;
}

export type Uid = {
  uid: number;
};
export type Username = {
  username: string;
};
