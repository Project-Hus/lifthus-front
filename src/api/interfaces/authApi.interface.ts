import { Uid } from "./userApi.interface";

export interface AuthApi {
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
