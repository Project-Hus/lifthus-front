import { AuthApi, SignParams } from "../interfacaes/authApi.interface";
import { statusInfo } from "../interfacaes/statusCode";
import { UserId } from "../interfacaes/userApi.interface";

import user_list from "../mocks/userTestApi.mocks";
import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    const signInReturns: UserId = {
      user_id: user_id,
    };
    if (!(user_id in user_list))
      return Promise.reject(statusInfo.fail.NotAcceptable);
    else if (user_id in user_list && password === "1234") return signInReturns;
    else return Promise.reject(statusInfo.fail.Unauthorized);
  },

  sign_up_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    return await new Promise((resolve, reject) => {
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
};
export default authTestApi;
