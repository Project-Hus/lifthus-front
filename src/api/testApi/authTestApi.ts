import {
  AuthApi,
  SessionResponse,
  SignParams,
  SignResponse,
} from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { Uid, UserMutationParams } from "../interfaces/userApi.interface";
import { SigningState } from "../mocks/state.mcok";
import userList, { userState } from "../mocks/userTestApi.mock";

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
  signUpLocal: ({ username, password }: SignParams): Promise<Uid> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (userList.find((user) => user.username))
          return reject(statusInfo.fail.Conflict);
        else if (username === "fail")
          return reject(statusInfo.fail.InternalServerError);
        else {
          const nuid = userState.nextUid;
          await userTestApi.setUserinfo({
            uid: nuid,
            newUserinfo: {
              id: nuid,
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
          userState.nextUid += 1;
        }
        return resolve({ uid: userState.nextUid - 1 });
      }, 500);
    });
  },
  updateSession: (): Promise<SessionResponse> => {
    return new Promise((resolve, reject) => {
      return resolve({
        uid: SigningState.uid,
        username: SigningState.username,
      });
    });
  },
};
export default authTestApi;
