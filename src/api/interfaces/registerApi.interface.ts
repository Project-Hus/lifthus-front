import { Uid, Username } from "./userApi.interface";

export interface RegisterApi {
  registerUsername: ({
    uid,
    username,
  }: RegisterUsernameParams) => Promise<Username>;
  register: ({
    uid,
    trainingType,
    bodyWeight,
    height,
    squat,
    benchpress,
    deadlift,
  }: RegisterParams) => Promise<Uid>;
}

export type RegisterUsernameParams = {
  uid: number;
  username: string;
};

export type RegisterParams = {
  uid: number;
  trainingType: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
};
