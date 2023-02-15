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
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams): RegisterUsernameReturns => {
    let name_flag = true;
    for (const key in user_list) {
      if (user_list[key]["username"] === username) {
        name_flag = false;
        break;
      }
    }
    if (name_flag) {
      userTestApi.set_user_info(id, { username: username });
      return { ok: true };
    }
    return { ok: false };
  },
  register: (register_info: RegisterParams): RegisterReturns => {
    const new_info = { registered: true, ...register_info };
    userTestApi.set_user_info(register_info.user_id, new_info);
    return { ok: true };
  },
};
export default registerTestApi;
