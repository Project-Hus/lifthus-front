import { RegisterParams } from "../interfacaes/registerApi.interface";
import { UserApi, UserProfile } from "../interfacaes/userApi.interface";

import user_list from "../mocks/userTestApi.mocks";

export const set_user_info = (
  user_id: string,
  new_user_info: RegisterParams | UserProfile
) => {
  user_list[user_id] = { ...new_user_info };
};
/* Mock Server */

const userTestApi: UserApi = {
  get_user_info: (user_id: string): UserProfile => {
    return { ...user_list[user_id] };
  },
};
export default userTestApi;
