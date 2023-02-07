import React from "react";
import { UserApi, UserProfile } from "./interfacaes/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  get_user_info: (id: string): UserProfile => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_user_info(id);
    }
    return userTestApi.get_user_info(id);
  },
};

export default userApi;
