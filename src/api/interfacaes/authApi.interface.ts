export interface AuthApi {
  sign_in_local: ({}: SignParams) => SignInReturns;
  sign_up_local: ({}: SignParams) => SignUpReturns;
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
