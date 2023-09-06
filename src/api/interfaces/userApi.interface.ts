import { UserDto } from "../dtos/user.dto";

export interface UserApi {
  setUserInfo: (newUserinfo: UserMutationParams) => Promise<UserDto>;
  getUserInfo: ({ uid }: Uid) => Promise<UserDto | null>;
  getUserInfoByUsername: ({ username }: Username) => Promise<UserDto | null>;
  getUsers: (uids: string[]) => Promise<(UserDto | null)[]>;
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
