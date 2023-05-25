import { GetUserInfoDto } from "../dtos/user.dto";
import { Uid, Username } from "./userApi.interface";

export interface RegisterApi {
  registerUsername: ({
    uid,
    username,
  }: RegisterUsernameParams) => Promise<GetUserInfoDto>;
  register: ({
    uid,
    trainingType,
    bodyWeight,
    height,
    squat,
    benchpress,
    deadlift,
  }: RegisterParams) => Promise<RegisterParams>;
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
