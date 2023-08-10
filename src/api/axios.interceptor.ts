import axios from "axios";
import { LIFTHUS_SESSION_URL } from "../common/routes";

import statusInfo from "./interfaces/statusInfo.json";

export const axiosInterceptorSetter = () => {
  // request interceptor adding lst to Authorization header
  axios.interceptors.request.use((config) => {
    if (!config.headers) return config;

    let lst = sessionStorage.getItem("lifthus_st");
    if (lst !== null) {
      config.headers.Authorization = lst;
    }
    return config;
  });

  // response interceptor handling lst expiration
  axios.interceptors.response.use(
    // resp success
    (res) => {
      const {
        config: { url: targetURL },
        status,
        data: message,
      } = res;
      // fully print out of confifg and data
      if (
        targetURL?.startsWith(LIFTHUS_SESSION_URL + "/signout") &&
        status === statusInfo.succ.Ok.code &&
        message === "signed_out"
      ) {
        const newToken = res.headers.authorization;
        if (newToken) sessionStorage.setItem("lifthus_st", newToken);
      } else if (
        targetURL === LIFTHUS_SESSION_URL &&
        status === statusInfo.succ.Created.code
      ) {
        const newToken = res.headers.authorization;
        // "temporarily" store it in local storage when created.
        // to be kept during redirection.
        if (newToken) localStorage.setItem("lifthus_st", newToken);
      } else if (
        targetURL === LIFTHUS_SESSION_URL &&
        status === statusInfo.succ.Ok.code
      ) {
        const newToken = res.headers.authorization;
        if (newToken) sessionStorage.setItem("lifthus_st", newToken);
      }
      return res;
    },
    // resp failure
    async (err) => {
      try {
        const {
          config,
          response: { status, data },
        } = err;

        const targetURL = String(config.url);

        if (
          config.sent || // already sent or
          !(status === 401 && data === "expired_token") // not an expired token error
        ) {
          return Promise.reject(err); // just pass the error through.
        }
        config.sent = true; // mark the request as sent.

        const lst = await refreshLst();

        if (lst) {
          config.headers.Authorization = lst;
          return axios(config);
        }
        return Promise.reject(err);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  );
};

let latestToken: string | undefined;
let refreshLock: boolean = false;
const refreshLst = async (): Promise<string | undefined> => {
  try {
    if (refreshLock) {
      return latestToken;
    }
    const res = await axios.get(LIFTHUS_SESSION_URL, {
      withCredentials: true,
    });
    // depending on the status code, handle the response
    switch (res.status) {
      case statusInfo.succ.Ok.code:
      case statusInfo.succ.Created.code:
        break;
      case statusInfo.fail.InternalServerError.code:
        return undefined;
      default:
        return undefined;
    }
    // from Authorization header, get the token.
    latestToken = res.headers.authorization;
    if (latestToken) sessionStorage.setItem("lifthus_st", latestToken);
    refreshLock = true;
    setTimeout(() => {
      refreshLock = false;
    }, 2500);
    return latestToken;
  } catch (err) {
    return Promise.reject(err);
  }
};
