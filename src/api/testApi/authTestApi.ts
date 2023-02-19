import { AuthApi, SignParams } from "../interfacaes/authApi.interface";
import { UserId } from "../interfacaes/userApi.interface";

import user_list from "../mocks/userTestApi.mocks";
import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    const signInReturns: UserId = {
      user_id: "",
    };
    if (user_id in user_list && password === "1234") {
      signInReturns.user_id = user_id;
    } else if (!(user_id in user_list)) {
      return Promise.reject("no_existing_id");
    }
    return signInReturns;
  },

  sign_up_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    const signUpReturns: UserId = { user_id };
    if (user_id in user_list)
      return new Promise<UserId>((_, reject) => reject("existing_id"));
    else {
      userTestApi.set_user_info({
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
    return signUpReturns;
  },
};
export default authTestApi;
