import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "../interfacaes/registerApi.interface";
import { StatusInfo } from "../interfacaes/statusCode";
import { UserId } from "../interfacaes/userApi.interface";
import user_list from "../mocks/userTestApi.mocks";
import userTestApi from "./userTestApi";

const registerTestApi: RegisterApi = {
  register_username: async ({
    user_id,
    username,
  }: RegisterUsernameParams): Promise<UserId> => {
    let name_flag = true;
    for (const key in user_list) {
      if (user_list[key]["username"] === username) {
        name_flag = false;
        break;
      }
    }
    if (name_flag) {
      userTestApi.set_user_info({ user_id, new_user_info: { username } });
      return { user_id };
    }
    return Promise.reject(StatusInfo.fail.Conflict.message);
  },

  register: async (register_info: RegisterParams): Promise<UserId> => {
    const new_user_info = { registered: true, ...register_info };
    userTestApi.set_user_info({
      user_id: register_info.user_id,
      new_user_info,
    });
    return { user_id: register_info.user_id };
  },
};
export default registerTestApi;
