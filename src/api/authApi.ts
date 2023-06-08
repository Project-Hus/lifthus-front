import { AuthApi, SessionResponse } from "./interfaces/authApi.interface";

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
  signOut: async (): Promise<boolean> => {
    if (process.env.NODE_ENV === "development") {
      return await authTestApi.signOut();
    }
    const res = await axios.delete(HUS_AUTH_URL + "/auth/session/revoke", {
      withCredentials: true,
    });
    const res2 = await axios.delete(LIFTHUS_AUTH_URL + "/auth/session/revoke", {
      withCredentials: true,
    });
    return res.status === statusInfo.succ.Ok.code &&
      res2.status === statusInfo.succ.Ok.code
      ? true
      : Promise.reject();
  },
};

/**
 * updateSession does conduct many steps to establish and maintain the session.
 * @returns SessionResponse
 */
const updateSession = async (): Promise<SessionResponse> => {
  try {
    // getting new session
    let res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/new", {
      withCredentials: true,
    });
    console.log(res, res.data);
    // if ok, server returns uid and maintaining session
    if (res.status == statusInfo.succ.Ok.code)
      return { uid: res.data.uid, username: res.data.usename };
    // if it is not ok or created, return empty string
    if (res.status != statusInfo.succ.Created.code)
      return { uid: undefined, username: "" };
    console.log("new session created");

    // if it is created, server returns sid
    const sid = res.data;
    // checking hus session
    res = await axios.post(
      HUS_AUTH_URL + `/auth/session/check/lifthus/` + sid,
      {},
      { withCredentials: true }
    );
    if (res.status != statusInfo.succ.Ok.code)
      return { uid: undefined, username: "" };
    console.log("hus session checked");

    // if hus says ok, request signed token from lifthus
    res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/sign", {
      withCredentials: true,
    });
    console.log("got signed token");
    // if it's ok, server returns uid
    return { uid: res.data.uid, username: res.data.username };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const rstatus = err.response?.status;
      const rdata = err.response?.data;
      if (rstatus === statusInfo.fail.Unauthorized.code && rdata === "retry") {
        // for the case that Hus session checked but expired.
        console.log("retrying");
        return authApi.updateSession();
      }
    }
    console.log(err);
    return { uid: undefined, username: "" };
  }
};

export default authApi;
