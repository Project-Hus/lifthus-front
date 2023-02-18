import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterUsernameReturns,
  RegisterParams,
  RegisterReturns,
} from "../interfacaes/registerApi.interface";
import user_list from "../mocks/userTestApi.mocks";
import userTestApi from "./userTestApi";

const registerTestApi: RegisterApi = {
  register_username: async ({
    id,
    username,
  }: RegisterUsernameParams): Promise<RegisterUsernameReturns> => {
    let name_flag = true;
    for (const key in user_list) {
      if (user_list[key]["username"] === username) {
        name_flag = false;
        break;
      }
    }
    if (name_flag) {
      userTestApi.set_user_info(id, { username: username });
      return { username };
    }
    return new Promise<RegisterUsernameReturns>((_, reject) =>
      reject("existing_username")
    );
  },

  register: async (register_info: RegisterParams): Promise<RegisterReturns> => {
    const new_info = { registered: true, ...register_info };
    userTestApi.set_user_info(register_info.user_id, new_info);
    return { user_id: register_info.user_id };
  },
};
export default registerTestApi;
