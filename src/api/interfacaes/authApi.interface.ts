export interface AuthApi {
  sign_in_local: ({}: SignParams) => Promise<SignInReturns>;
  sign_up_local: ({}: SignParams) => Promise<SignUpReturns>;
}
export interface SignParams {
  id: string;
  password: string;
}

export interface SignInReturns {
  user_id: string;
  fid: boolean;
  ok: boolean;
}

export interface SignUpReturns {
  fid: boolean;
  ok: boolean;
}
