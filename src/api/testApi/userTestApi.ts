import { RegisterParams } from "../interfacaes/registerApi.interface";
import { UserApi, UserProfile } from "../interfacaes/userApi.interface";

import user_list from "../mocks/userTestApi.mocks";

const userTestApi: UserApi = {
  set_user_info: (
    user_id: string,
    new_user_info: RegisterParams | UserProfile
  ) => {
    user_list[user_id] = { ...new_user_info };
    return true;
  },
  get_user_info: (user_id: string): UserProfile => {
    return { ...user_list[user_id] };
  },
};
export default userTestApi;
