export interface RegisterApi {
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams) => Promise<RegisterUsernameReturns>;
  register: (register_info: RegisterParams) => Promise<RegisterReturns>;
}
export interface RegisterUsernameParams {
  id: string;
  username: string;
}

export interface RegisterUsernameReturns {
  username: string;
}

export interface RegisterParams {
  user_id: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
}
export interface RegisterReturns {
  user_id: string;
}
