import { RegisterParams } from "./registerApi.interface";

export interface UserApi {
  set_user_info: (
    user_id: string,
    new_user_info: RegisterParams | UserProfile
  ) => Promise<boolean>;
  get_user_info: (id: string) => Promise<UserProfile>;
  get_id_by_name: (name: string) => Promise<{ user_id: string; ok: boolean }>;
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
