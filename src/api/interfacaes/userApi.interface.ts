export interface UserApi {
  get_user_info: (id: string) => UserProfile;
}

export interface UserProfile {
  user_id?: string;
  registered?: boolean;
  nickname?: string;
  training_type?: string;
  body_weight?: number;
  height?: number;
  squat?: number;
  benchpress?: number;
  deadlift?: number;
}
