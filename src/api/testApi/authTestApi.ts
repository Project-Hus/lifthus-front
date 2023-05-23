import axios from "axios";
import { HUS_AUTH_URL, LIFTHUS_AUTH_URL } from "../../common/routes";
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
  updateSession: async (): Promise<SessionResponse> => {
    // get lifthus_st from localStorage
    const lifthus_st = localStorage.getItem("lifthus_st");
    const Authorization = lifthus_st ? lifthus_st : "";
    try {
      // getting new session
      let res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/new", {
        withCredentials: true,
        headers: { Authorization },
      });

      // if ok, server maintains session and returns uid and username
      if (res.status === statusInfo.succ.Ok.code) {
        return { uid: res.data.uid, username: res.data.usename };
      }
      // if it is not ok or created, return empty string
      if (res.status !== statusInfo.succ.Created.code) {
        localStorage.setItem("lifthus_st", "");
        return { uid: undefined, username: "" };
      }

      console.log("new session created");
      localStorage.setItem("lifthus_st", res.headers.authorization);
      // if it is created, server returns sid
      const sid = res.data;
      // checking hus session
      res = await axios.post(
        HUS_AUTH_URL +
          `/auth/session/check/${
            process.env.NODE_ENV === "development" ? "localhost" : "lifthus"
          }/` +
          sid,
        {},
        { withCredentials: true, headers: { Authorization } }
      );
      if (res.status !== statusInfo.succ.Ok.code)
        return { uid: undefined, username: "" };
      console.log("hus session checked");

      // if hus says ok, request signed token from lifthus
      res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/sign", {
        withCredentials: true,
        headers: { Authorization },
      });
      console.log("got signed token");
      localStorage.setItem("lifthus_st", res.headers.authorization);
      // if it's ok, server returns uid
      return { uid: res.data.uid, username: res.data.username };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const rstatus = err.response?.status;
        const rdata = err.response?.data;
        if (
          rstatus === statusInfo.fail.Unauthorized.code &&
          rdata === "retry"
        ) {
          // for the case that Hus session checked but expired.
          console.log("retrying");
          return authTestApi.updateSession();
        }
      }
      console.log(err);
      return { uid: undefined, username: "" };
    }
  },
};
export default authTestApi;
