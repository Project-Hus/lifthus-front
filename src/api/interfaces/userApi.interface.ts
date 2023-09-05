import { GetUserInfoDto } from "../dtos/user.dto";

export interface UserApi {
  setUserInfo: (newUserinfo: UserMutationParams) => Promise<GetUserInfoDto>;
  getUserInfo: ({ uid }: Uid) => Promise<GetUserInfoDto>;
  getUserInfoByUsername: ({ username }: Username) => Promise<GetUserInfoDto>;
}

export type UserMutationParams = {
  uid: string;
  username?: string;
  birthdate?: Date;

  company?: string;
  location?: string;
  contact?: string;
};

export type Uid = {
  uid: string;
};
export type Username = {
  username: string;
};
