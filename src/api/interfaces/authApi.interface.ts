import { SignResponse, UserId, UserName } from "./userApi.interface";

export interface AuthApi {
  sign_in_local: ({ user_id, password }: SignParams) => Promise<UserId>;
  sign_up_local: ({ user_id, password }: SignParams) => Promise<UserId>;
  update_session: () => Promise<SignResponse>;
}
export interface SignParams {
  user_id: string;
  password: string;
}
