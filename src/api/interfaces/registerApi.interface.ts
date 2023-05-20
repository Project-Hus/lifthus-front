import { Uid } from "./userApi.interface";

export interface RegisterApi {
  register_username: ({
    user_id,
    username,
  }: RegisterUsernameParams) => Promise<Uid>;
  register: ({
    user_id,
    training_type,
    body_weight,
    height,
    squat,
    benchpress,
    deadlift,
  }: RegisterParams) => Promise<Uid>;
}

export interface RegisterUsernameParams {
  user_id: string;
  username: string;
}

export interface RegisterParams {
  user_id: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}
