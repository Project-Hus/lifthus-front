import { app_info } from "../../store/interfaces/app.interface";

export interface authApi_form {
  sign_in_local: ({}: sign_form) => sign_in_out;
  sign_up_local: ({}: sign_form) => sign_up_out;
  get_user_info: (id: string) => get_user_info_form;
}

export interface get_user_info_form {
  user_id: string;
  registered: boolean;
  nickname: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}
export interface sign_form {
  id: string;
  password: string;
}

export interface sign_in_out {
  user_id: string;
  fid: boolean;
  ok: boolean;
}

export interface sign_up_out {
  fid: boolean;
  ok: boolean;
}
