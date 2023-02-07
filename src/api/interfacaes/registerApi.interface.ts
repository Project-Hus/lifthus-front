import { register_info } from "../../store/interfaces/register.interface";

export interface RegisterApi {
  register_nickname: ({
    id,
    nickname,
  }: RegisterNicknameParams) => RegisterNicknameReturns;
  register: (register_info: RegisterParams) => RegisterReturns;
}
export interface RegisterNicknameParams {
  id: string;
  nickname: string;
}

export interface RegisterNicknameReturns {
  ok: boolean;
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
export interface RegisterReturns {
  ok: boolean;
}
