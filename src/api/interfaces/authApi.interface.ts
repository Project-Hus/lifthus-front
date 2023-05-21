import { Uid } from "./userApi.interface";

export interface AuthApi {
  signInLocal: ({ username, password }: SignParams) => Promise<SignResponse>;
  signUpLocal: ({ username, password }: SignParams) => Promise<Uid>;
  updateSession: () => Promise<SessionResponse>;
}
export type SignParams = {
  username: string;
  password: string;
};

export type SignResponse = {
  uid: number;
  username?: string;
};

export type SessionResponse = {
  uid?: number;
  username?: string;
};
