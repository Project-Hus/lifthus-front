import { AuthApi, SignParams } from "./interfaces/authApi.interface";
import { UserId } from "./interfaces/userApi.interface";

import axios, { AxiosResponse } from "axios";
import statusInfo from "./interfaces/statusInfo.json";

import authTestApi from "./testApi/authTestApi";

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

  update_session: async (): Promise<UserId> => {
    //if (process.env.NODE_ENV === "development") {
    //  return authTestApi.update_session();
    //}

    // client will get new sid from lifthus/session/new,
    // then client will send the sid to Hus auth server.
    // and if Hus responds Unauthorized, client will stay unsigned in.
    // or else, Hus tells Lifthus that the user is signed in.
    // then Lifthus will set the login session and tells Ok to Hus.
    // Hus got Ok, now Hus tells the client Ok.
    // and finally, the client requests signing from Lifthus.
    // later when the client uses expired token,
    // the client repeats this process with this function.
    try {
      // getting new session
      let res = await axios.post(
        process.env.REACT_APP_LIFTHUS_AUTH_URL + "/session/new",
        {},
        {
          withCredentials: true,
        }
      );
      const sid = res.data;
      // checking hus session
      res = await axios.post(
        process.env.REACT_APP_HUS_AUTH_URL + "/session/check/lifthus/" + sid,
        {},
        { withCredentials: true }
      );
      // it hus says ok, request signed token from lifthus
      res = await axios.post(
        process.env.REACT_APP_LIFTHUS_AUTH_URL + "/session/sign",
        {},
        { withCredentials: true }
      );
      return { user_id: res.data };
    } catch (err) {
      console.log(err);
      return { user_id: "" };
    }
  },
};

export default authApi;
