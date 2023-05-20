import { Uid } from "./userApi.interface";

export interface AuthApi {
  signInLocal: ({ username, password }: SignParams) => Promise<SignResponse>;
  singUpLocal: ({ username, password }: SignParams) => Promise<Uid>;
  updateSession: () => Promise<SignResponse>;
}
export type SignParams = {
  username: string;
  password: string;
};

export type SignResponse = {
  uid?: number;
  username?: string;
};
