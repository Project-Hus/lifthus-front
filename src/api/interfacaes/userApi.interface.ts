import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  set_user_info: (
    user_id: string,
    new_user_info: RegisterParams | UserProfile
  ) => boolean;
  get_user_info: (id: string) => UserProfile;
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
