import { AuthApi, SignParams } from "./interfaces/authApi.interface";
import { SignResponse, UserId } from "./interfaces/userApi.interface";

import axios, { AxiosError, AxiosResponse } from "axios";
import statusInfo from "./interfaces/statusInfo.json";

import authTestApi from "./testApi/authTestApi";
import { HUS_AUTH_URL, LIFTHUS_AUTH_URL } from "../common/routes";

const authApi: AuthApi = {
  sign_in_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ user_id, password });
    }
    return authTestApi.sign_in_local({ user_id, password });
  },

  sign_up_local: async ({ user_id, password }: SignParams): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return authTestApi.sign_up_local({ user_id, password });
    }
    return authTestApi.sign_up_local({ user_id, password });
  },

  update_session: async (): Promise<SignResponse> => {
    //if (process.env.NODE_ENV === "development") {
    //  return authTestApi.update_session();
    //}
    try {
      // getting new session
      let res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/new", {
        withCredentials: true,
      });
      console.log(res, res.data);
      // if ok, server returns uid and maintaining session
      if (res.status == statusInfo.succ.Ok.code)
        return { user_id: res.data.user_id, user_name: res.data.user_name };
      // if it is not ok or created, return empty string
      if (res.status != statusInfo.succ.Created.code)
        return { user_id: "", user_name: "" };
      console.log("new session created");

      // if it is created, server returns sid
      const sid = res.data;
      // checking hus session
      res = await axios.post(
        HUS_AUTH_URL + "/auth/session/check/lifthus/" + sid,
        {},
        { withCredentials: true }
      );
      if (res.status != statusInfo.succ.Ok.code)
        return { user_id: "", user_name: "" };
      console.log("hus session checked");

      // if hus says ok, request signed token from lifthus
      res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session/sign", {
        withCredentials: true,
      });
      console.log("got signed token");
      // if it's ok, server returns uid
      return { user_id: res.data.user_id, user_name: res.data.user_name };
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
          return authApi.update_session();
        }
      }
      console.log(err);
      return { user_id: "", user_name: "" };
    }
  },
};

export default authApi;
