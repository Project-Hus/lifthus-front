import { UserApi, UserProfile } from "./interfacaes/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  set_user_info: (id, new_info) => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.set_user_info(id, new_info);
    } else return false;
  },
  get_user_info: (id: string): UserProfile => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_user_info(id);
    }
    return userTestApi.get_user_info(id);
  },
};

export default userApi;
