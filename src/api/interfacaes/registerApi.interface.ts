import { register_info } from "../../store/interfaces/register.interface";

export interface registerApi_form {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form) => register_nickname_out;
  register: (
    register_info: { user_id: string } & register_info
  ) => register_out;
}
export interface register_nickname_form {
  id: string;
  nickname: string;
}

export interface register_nickname_out {
  ok: boolean;
}

export interface register_out {
  ok: boolean;
}
