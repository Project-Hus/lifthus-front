import axios from "axios";
import { LIFTHUS_SESSION_URL } from "../common/routes";

import statusInfo from "./interfaces/statusInfo.json";

let latestToken: string | undefined;
let refreshLock: boolean = false;
export const refreshLst = async (): Promise<string | undefined> => {
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
