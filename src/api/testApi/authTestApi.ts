import {
  AuthApi,
  SignParams,
  SignResponse,
} from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { Uid, UserMutationParams } from "../interfaces/userApi.interface";
import { SigningState } from "../mocks/state.mcok";
import userList, { nextUid } from "../mocks/userTestApi.mock";

import userTestApi from "./userTestApi";

const authTestApi: AuthApi = {
  signInLocal: ({ username, password }: SignParams): Promise<SignResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const user = userList.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          SigningState.uid = user.id;
          SigningState.username = user.username;
          return resolve({ uid: user.id, username: user.username });
        }
        return reject(statusInfo.fail.Unauthorized);
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
            uid: nextUid,
            newUserinfo: {
              id: nextUid,
              registered: false,
              registered_at: null,
              username: "",
              email: "",
              email_verified: false,
              name: "",
              given_name: "",
              family_name: "",
              birthdate: undefined,
              profile_image_url: "",
              created_at: new Date(),
              updated_at: new Date(),

              password: password,
            },
          });
        }
        return resolve({ uid: nextUid });
      }, 500);
    });
  },
  updateSession: (): Promise<SignResponse> => {
    return new Promise((resolve, reject) => {
      return resolve({
        uid: SigningState.uid,
        username: SigningState.username,
      });
    });
  },
};
export default authTestApi;
