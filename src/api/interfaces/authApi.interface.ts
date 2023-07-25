import { Uid } from "./userApi.interface";

export interface AuthApi {
  updateSession: () => Promise<SessionResponse>;
  getSID: () => Promise<string>;
  signOut: () => Promise<void>;
}
export type SignParams = {
  username: string;
  password: string;
};

export type SignResponse = {
  uid: number;
  username?: string;
};

// export type SessionResponse = {
//   uid?: number;
//   username?: string;
// };

export type SessionResponse = {
  created?: SessionCreated;
  user?: SessionUserInfo;
};

export type SessionUserInfo = {
  uid: string;
  registered: boolean;
  username?: string;
  usercode: string;
};

export type SessionCreated = {
  sid: string;
};
