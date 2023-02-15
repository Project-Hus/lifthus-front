import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterUsernameReturns,
  RegisterParams,
  RegisterReturns,
} from "../interfacaes/registerApi.interface";
import { set_user_info } from "./userTestApi.mocks";

const registerTestApi: RegisterApi = {
  register_username: ({
    id,
    username,
  }: RegisterUsernameParams): RegisterUsernameReturns => {
    if (username === "succ") {
      set_user_info({ username: username });
      return { ok: true };
    }
    return { ok: false };
  },
  register: (register_info: RegisterParams): RegisterReturns => {
    const new_info = { registered: true, ...register_info };
    set_user_info(new_info);
    return { ok: true };
  },
};
export default registerTestApi;
