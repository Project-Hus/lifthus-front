import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  set_user_info: ({ uid, new_user_info }: SetUserInfoParams) => Promise<Uid>;
  get_user_info: ({ uid }: Uid) => Promise<UserProfile>;
  get_id_by_name: ({ username }: Username) => Promise<Uid>;
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
export interface SignResponse {
  user_id: string;
  user_name: string;
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
