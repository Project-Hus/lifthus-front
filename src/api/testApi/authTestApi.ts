import axios from "axios";
import { HUS_AUTH_URL, LIFTHUS_AUTH_URL } from "../../common/routes";
import { AuthApi, SessionResponse } from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";

const authTestApi: AuthApi = {
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
  signOut: async (): Promise<boolean> => {
    localStorage.setItem("lifthus_st", "");
    const res = await axios.delete(HUS_AUTH_URL + "/auth/session/revoke", {
      withCredentials: true,
    });
    // local version not implemented yet
    const res2 = await axios.delete(LIFTHUS_AUTH_URL + "/auth/session/revoke", {
      withCredentials: true,
    });
    return res.status === statusInfo.succ.Ok.code &&
      res2.status === statusInfo.succ.Ok.code
      ? true
      : Promise.reject();
  },
};
export default authTestApi;
