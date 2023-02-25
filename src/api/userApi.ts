import {
  SetUserInfoParams,
  UserApi,
  UserId,
  Username,
  UserProfile,
} from "./interfaces/userApi.interface";
import userTestApi from "./testApi/userTestApi";

const userApi: UserApi = {
  set_user_info: async ({ user_id, new_user_info }: SetUserInfoParams) => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.set_user_info({ user_id, new_user_info });
    }
    return userTestApi.set_user_info({ user_id, new_user_info });
  },
  get_user_info: async ({ user_id }: UserId): Promise<UserProfile> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_user_info({ user_id });
    }
    return userTestApi.get_user_info({ user_id });
  },
  get_id_by_name: async ({ username }: Username): Promise<UserId> => {
    if (process.env.NODE_ENV === "development") {
      return userTestApi.get_id_by_name({ username });
    }
    return userTestApi.get_id_by_name({ username });
  },
};

export default userApi;
