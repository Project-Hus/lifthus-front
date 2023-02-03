import { app_info } from "../../store/interfaces/app.interface";

export interface authApi_form {
  sign_in_local: ({}: sign_form) => sign_in_out;
  sign_up_local: ({}: sign_form) => sign_up_out;
  get_user_info: (id: string) => app_info;
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
