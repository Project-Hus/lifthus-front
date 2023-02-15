import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterUsernameReturns,
  RegisterParams,
  RegisterReturns,
} from "../interfacaes/registerApi.interface";
import userTestApi from "./userTestApi";

const registerTestApi: RegisterApi = {
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams): RegisterUsernameReturns => {
    if (username === "succ") {
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
