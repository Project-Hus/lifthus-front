import {
  AuthApi,
  SessionResponse,
  SessionUserInfo,
} from "./interfaces/authApi.interface";

import axios from "axios";
import statusInfo from "./interfaces/statusInfo.json";

import authTestApi from "./testApi/authTestApi";
import {
  HUS_AUTH_URL,
  LIFTHUS_AUTH_URL,
  LIFTHUS_ERR_URL,
  LIFTHUS_SESSION_URL,
} from "../common/routes";
import { LIFTHUS_SERVICE_NAME } from "../common/llifthus";

const authApi: AuthApi = {
  updateSession: async (): Promise<SessionResponse> => {
    // if (process.env.NODE_ENV === "development") {
    //   return await authTestApi.updateSession();
    // }
    return await updateSession();
  },
  getSID: async (): Promise<string> => {
    // if (process.env.NODE_ENV === "development") {
    //   return await authTestApi.getSID();
    // }
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
    // if (process.env.NODE_ENV === "development") {
    //   return await authTestApi.signOut();
    // }
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
  const lst = localStorage.getItem("lifthus_st");
  if (lst) {
    sessionStorage.setItem("lifthus_st", lst);
    localStorage.removeItem("lifthus_st");
  }
  try {
    // update session
    const res = await axios.get(LIFTHUS_SESSION_URL, {
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
        // redirect to Cloudhus to connect both sessions.
        const currentURL = window.location.href;
        const sid = res.data;
        if (sid) {
          // if new session is created, redirect to Cloudhus and connect to the hussession.
          window.location.href = `${HUS_AUTH_URL}/auth/hus?service=${LIFTHUS_SERVICE_NAME}&sid=${sid}&redirect=${encodeURIComponent(
            currentURL
          )}&fallback=${LIFTHUS_ERR_URL}`;
        }
        // not reachable below
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

export default authApi;
