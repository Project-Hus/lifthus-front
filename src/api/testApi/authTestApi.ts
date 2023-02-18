import authApi from "../authApi";
import {
  AuthApi,
  SignInReturns,
  SignParams,
  SignUpReturns,
} from "../interfacaes/authApi.interface";

import user_list from "../mocks/userTestApi.mocks";
import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  sign_in_local: async ({
    id,
    password,
  }: SignParams): Promise<SignInReturns> => {
    const signInReturns: SignInReturns = {
      user_id: "",
      fid: false,
      ok: false,
    };
    if (id in user_list && password === "1234") {
      signInReturns.user_id = id;
      signInReturns.ok = true;
    } else if (!(id in user_list)) {
      signInReturns.fid = true;
    }
    return signInReturns;
  },

  sign_up_local: async ({
    id,
    password,
  }: SignParams): Promise<SignUpReturns> => {
    const signUpReturns: SignUpReturns = {
      fid: false,
      ok: false,
    };
    if (id in user_list) signUpReturns.fid = true;
    else {
      signUpReturns.ok = true;
      userTestApi.set_user_info(id, {
        user_id: id,
        registered: false,
        username: "",
        training_type: "",
        body_weight: NaN,
        height: NaN,
        squat: NaN,
        benchpress: NaN,
        deadlift: NaN,
      });
    }
    return signUpReturns;
  },
};
export default authTestApi;
