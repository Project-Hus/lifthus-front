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
