import {
  AuthApi,
  SignParams,
  SignResponse,
} from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { Uid } from "../interfaces/userApi.interface";
import userList, { nextUid } from "../mocks/userTestApi.mock";

import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  signInLocal: ({ username, password }: SignParams): Promise<SignResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const user = userList.find(
          (user) => user.username === username && user.password === password
        );
        if (user) return resolve({ uid: user.id, username: user.username });
        else return reject(statusInfo.fail.Unauthorized);
      }, 500);
    });
  },
  singUpLocal: ({ username, password }: SignParams): Promise<Uid> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (userList.find((user) => user.username))
          return reject(statusInfo.fail.Conflict);
        else if (username === "fail")
          return reject(statusInfo.fail.InternalServerError);
        else {
          await userTestApi.setUserinfo({
            nextUid,
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
