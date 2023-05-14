import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  set_user_info: ({
    user_id,
    new_user_info,
  }: SetUserInfoParams) => Promise<UserId>;
  get_user_info: ({ user_id }: UserId) => Promise<UserProfile>;
  get_id_by_name: ({ username }: Username) => Promise<UserId>;
}
export interface SetUserInfoParams {
  user_id: string;
  new_user_info: RegisterParams | UserProfile;
}
export interface UserId {
  user_id: string;
}
export interface UserName {
  user_name: string;
}
export interface SignResponse {
  user_id: string;
  user_name: string;
}
export interface Username {
  username: string;
}
export interface UserProfile {
  user_id?: string;
  registered?: boolean;
  username?: string;
  training_type?: string;
  body_weight?: number;
  height?: number;
  squat?: number;
  benchpress?: number;
  deadlift?: number;
}
