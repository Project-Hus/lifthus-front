import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "../interfaces/registerApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { UserId } from "../interfaces/userApi.interface";
import user_list from "../mocks/userTestApi.mock";
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
    return Promise.reject(statusInfo.fail.Conflict);
  },

  register: async (register_info: RegisterParams): Promise<UserId> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const new_user_info = { registered: true, ...register_info };
        await userTestApi.set_user_info({
          user_id: register_info.user_id,
          new_user_info,
        });
        return resolve({ user_id: register_info.user_id });
      }, 500);
    });
  },
};
export default registerTestApi;
