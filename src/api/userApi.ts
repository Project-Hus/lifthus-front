import { UserApi, UserProfile } from "./interfacaes/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  set_user_info: (id, new_info) => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.set_user_info(id, new_info);
    }
    return userTestApi.set_user_info(id, new_info);
  },
  get_user_info: (id: string): UserProfile => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_user_info(id);
    }
    return userTestApi.get_user_info(id);
  },
  get_id_by_name: (name: string): { user_id: string; ok: boolean } => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_id_by_name(name);
    }
    return userTestApi.get_id_by_name(name);
  },
};

export default userApi;
