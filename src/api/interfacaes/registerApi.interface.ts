import { register_info } from "../../store/interfaces/register.interface";

export interface registerApi_form {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form) => register_nickname_out;
  register: (register_info: register_form) => register_out;
}
export interface register_nickname_form {
  id: string;
  nickname: string;
}

export interface register_nickname_out {
  ok: boolean;
}

export interface register_form {
  user_id: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}
export interface register_out {
  ok: boolean;
}
