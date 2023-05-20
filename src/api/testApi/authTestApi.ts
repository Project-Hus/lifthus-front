import { AuthApi, SignParams } from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { SignResponse, UserId } from "../interfaces/userApi.interface";

import user_list from "../mocks/userTestApi.mock";
import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: ({ user_id, password }: SignParams): Promise<UserId> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const signInReturns: UserId = {
          user_id: user_id,
        };
        if (!(user_id in user_list)) {
          if (user_id === "fail")
            return reject(statusInfo.fail.InternalServerError);
          return reject(statusInfo.fail.NotAcceptable);
        } else if (user_id in user_list && password === "1234")
          return resolve(signInReturns);
        else return reject(statusInfo.fail.Unauthorized);
      }, 500);
    });
  },
  sign_up_local: ({ user_id, password }: SignParams): Promise<UserId> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const signUpReturns: UserId = { user_id };
        if (user_id in user_list) return reject(statusInfo.fail.Conflict);
        else if (user_id === "fail")
          return reject(statusInfo.fail.InternalServerError);
        else {
          await userTestApi.set_user_info({
            user_id,
            new_user_info: {
              user_id,
              registered: false,
              username: "",
              training_type: "",
              body_weight: NaN,
              height: NaN,
              squat: NaN,
              benchpress: NaN,
              deadlift: NaN,
            },
          });
        }
        return resolve(signUpReturns);
      }, 500);
    });
  },
  update_session: (): Promise<SignResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updateSessionReturns: SignResponse = {
          user_id: "test",
          user_name: "test",
        };
        return resolve(updateSessionReturns);
      }, 500);
    });
  },
};
export default authTestApi;
