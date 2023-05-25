import { GetUserInfoDto } from "../dtos/user.dto";

export interface UserApi {
  setUserinfo: ({ uid, newUserinfo }: SetUserInfoParams) => Promise<Uid>;
  getUserInfo: ({ uid }: Uid) => Promise<GetUserInfoDto>;
  getUserInfoByUsername: ({ username }: Username) => Promise<GetUserInfoDto>;
}
export interface SetUserInfoParams {
  uid: number;
  newUserinfo: UserMutationParams;
}

export type UserMutationParams = {
  id?: number;
  registered?: boolean;
  registered_at?: Date | null;
  username?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  birthdate?: Date;
  profile_image_url?: string;
  created_at?: Date;
  updated_at?: Date;

  password?: string;
};

export type Uid = {
  uid: number;
};
export type Username = {
  username: string;
};
