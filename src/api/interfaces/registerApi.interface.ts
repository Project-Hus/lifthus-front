import { Uid } from "./userApi.interface";

export interface RegisterApi {
  register_username: ({
    uid,
    username,
  }: RegisterUsernameParams) => Promise<Uid>;
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

export interface RegisterUsernameParams {
  uid: number;
  username: string;
}

export interface RegisterParams {
  uid: number;
  trainingType: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}
