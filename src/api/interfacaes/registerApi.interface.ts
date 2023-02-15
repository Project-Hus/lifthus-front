import { register_info } from "../../store/interfaces/register.interface";

export interface RegisterApi {
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams) => RegisterUsernameReturns;
  register: (register_info: RegisterParams) => RegisterReturns;
}
export interface RegisterUsernameParams {
  id: string;
  username: string;
}

export interface RegisterUsernameReturns {
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
