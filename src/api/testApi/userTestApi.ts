import { RegisterParams } from "../interfacaes/registerApi.interface";
import { UserApi, UserProfile } from "../interfacaes/userApi.interface";

import user_list from "../mocks/userTestApi.mocks";

const userTestApi: UserApi = {
  set_user_info: async (
    user_id: string,
    new_user_info: RegisterParams | UserProfile
  ): Promise<boolean> => {
    user_list[user_id] = { ...user_list[user_id], ...new_user_info };
    return true;
  },
  get_user_info: async (user_id: string): Promise<UserProfile> => {
    return { ...user_list[user_id] };
  },
  get_id_by_name: async (
    username: string
  ): Promise<{ user_id: string; ok: boolean }> => {
    for (const k in user_list) {
      if (user_list[k].username === username)
        return { user_id: user_list[k].user_id, ok: true };
    }
    return { user_id: "", ok: false };
  },
};
export default userTestApi;
