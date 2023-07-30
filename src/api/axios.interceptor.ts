import axios from "axios";
import { LIFTHUS_SESSION_URL } from "../common/routes";

import statusInfo from "./interfaces/statusInfo.json";

// request interceptor adding lst to Authorization header
axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  let lst = localStorage.getItem("lifthus_st");

  if (lst !== null) {
    config.headers.Authorization = lst;
  }
  return config;
});

// response interceptor handling lst expiration
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status, data: msg },
    } = err;
    console.log("TEST TEST");
    if (
      config.url === LIFTHUS_SESSION_URL || // previous request was to refresh.
      status != 401 ||
      msg != "expired_token" || // response is not expiration error.
      config.sent // already sent.
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
  }
);

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
    // latestToken = LATER WHEN INTRODUCING TOKEN IN HEADER.
    // localStorage.setItem("lifthus_st", latestToken);
    refreshLock = true;
    setTimeout(() => {
      refreshLock = false;
    }, 2500);
    return latestToken;
  } catch (err) {
    return Promise.reject(err);
  }
};
