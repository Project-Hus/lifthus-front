import { Uid } from "./userApi.interface";

export interface AuthApi {
  sign_in_local: ({ username, password }: SignParams) => Promise<SignResponse>;
  sign_up_local: ({ username, password }: SignParams) => Promise<Uid>;
  update_session: () => Promise<SignResponse>;
}
export type SignParams = {
  username: string;
  password: string;
};

export type SignResponse = {
  uid?: number;
  username?: string;
};
