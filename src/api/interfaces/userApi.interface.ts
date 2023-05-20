import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  setUserinfo: ({ uid, new_user_info }: SetUserInfoParams) => Promise<Uid>;
  getUserInfo: ({ uid }: Uid) => Promise<UserProfile>;
  getIdByName: ({ username }: Username) => Promise<Uid>;
}
export interface SetUserInfoParams {
  uid: number;
  new_user_info: RegisterParams | UserProfile;
}
export interface Uid {
  uid: number;
}
export interface Username {
  username: string;
}

export interface UserProfile {
  uid: number;
  registered: boolean;
  registered_at?: Date | null;
  username?: string;
  email: string;
  email_verified: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  birthdate?: Date;
  profile_image_url?: string;
  created_at: Date;
  updated_at: Date;
}
