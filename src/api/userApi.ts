import React from "react";
import { userApi_form, UserProfile } from "./interfacaes/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: userApi_form = {
  get_user_info: (id: string): UserProfile => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_user_info(id);
    }
    return userTestApi.get_user_info(id);
  },
};

export default userApi;
