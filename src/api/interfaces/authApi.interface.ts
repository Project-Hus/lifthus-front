import { SignResponse, Uid } from "./userApi.interface";

export interface AuthApi {
  sign_in_local: ({ user_id, password }: SignParams) => Promise<Uid>;
  sign_up_local: ({ user_id, password }: SignParams) => Promise<Uid>;
  update_session: () => Promise<SignResponse>;
}
export interface SignParams {
  user_id: string;
  password: string;
}
