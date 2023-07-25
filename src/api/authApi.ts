import {
  AuthApi,
  SessionResponse,
  SessionUserInfo,
} from "./interfaces/authApi.interface";

import axios from "axios";
import statusInfo from "./interfaces/statusInfo.json";

import authTestApi from "./testApi/authTestApi";
import { HUS_AUTH_URL, LIFTHUS_AUTH_URL } from "../common/routes";

const authApi: AuthApi = {
  updateSession: async (): Promise<SessionResponse> => {
    if (process.env.NODE_ENV === "development") {
      return await authTestApi.updateSession();
    }
    return updateSession();
  },
  getSID: async (): Promise<string> => {
    if (process.env.NODE_ENV === "development") {
      return await authTestApi.getSID();
    }
    try {
      const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/sid", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
  signOut: async (): Promise<void> => {
    if (process.env.NODE_ENV === "development") {
      return await authTestApi.signOut();
    }
    try {
      const res = await axios.patch(
        LIFTHUS_AUTH_URL + "/auth/session/signout",
        {},
        {
          withCredentials: true,
        }
      );
      switch (res.status) {
        case statusInfo.succ.Ok.code:
          return;
        case statusInfo.fail.BadRequest.code:
          throw new Error(statusInfo.fail.BadRequest.message);
        case statusInfo.fail.Unauthorized.code:
          throw new Error(statusInfo.fail.Unauthorized.message);
        case statusInfo.fail.InternalServerError.code:
          throw new Error(statusInfo.fail.BadRequest.message);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

/**
 * Updates and issues a session.
 * if got Created, redi
 * @returns {SessionResponseV2|null} user info if presents, null if not.
 * @throws {Error} Unexpected status code
 */
const updateSession = async (): Promise<SessionResponse> => {
  try {
    // update session
    const res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session", {
      withCredentials: true,
    });
    // depending on the status code, handle the response
    switch (res.status) {
      /* Ok, just handle the user info */
      case statusInfo.succ.Ok.code:
        const user: SessionUserInfo = res.data;
        if (user) {
          return { user };
        }
        return {};
      /* Created, redirect to Cloudhus to connect both sessions. */
      case statusInfo.succ.Created.code:
        const sid = res.data; // new session id sent from Lifthus
        return { created: { sid } };
      /* InternalServerError, try once more. */
      case statusInfo.fail.InternalServerError.code:
        throw new Error(statusInfo.fail.InternalServerError.message);
      default:
        throw new Error(statusInfo.fail.Unexpected.message);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

// /**
//  * updateSession does conduct many steps to establish and maintain the session.
//  * @returns SessionResponse
//  */
// const updateSession = async (): Promise<SessionResponse> => {
//   try {
//     // getting new session
//     let res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/new", {
//       withCredentials: true,
//     });
//     console.log(res, res.data);
//     // if ok, server returns uid and maintaining session
//     if (res.status == statusInfo.succ.Ok.code)
//       return { uid: res.data.uid, username: res.data.usename };
//     // if it is not ok or created, return empty string
//     if (res.status != statusInfo.succ.Created.code)
//       return { uid: undefined, username: "" };
//     console.log("new session created");

//     // if it is created, server returns sid
//     const sid = res.data;
//     // checking hus session
//     res = await axios.post(
//       HUS_AUTH_URL + `/auth/session/check/lifthus/` + sid,
//       {},
//       { withCredentials: true }
//     );
//     if (res.status != statusInfo.succ.Ok.code)
//       return { uid: undefined, username: "" };
//     console.log("hus session checked");

//     // if hus says ok, request signed token from lifthus
//     res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/sign", {
//       withCredentials: true,
//     });
//     console.log("got signed token");
//     // if it's ok, server returns uid
//     return { uid: res.data.uid, username: res.data.username };
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       const rstatus = err.response?.status;
//       const rdata = err.response?.data;
//       if (rstatus === statusInfo.fail.Unauthorized.code && rdata === "retry") {
//         // for the case that Hus session checked but expired.
//         console.log("retrying");
//         return authApi.updateSession();
//       }
//     }
//     console.log(err);
//     return { uid: undefined, username: "" };
//   }
// };

export default authApi;
