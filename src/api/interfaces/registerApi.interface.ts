import { GetUserInfoDto } from "../dtos/user.dto";

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
  uid: string;
  username: string;
};

export type RegisterParams = {
  uid: string;
  trainingType: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
};
