import {
  RegisterApi,
  RegisterNicknameParams,
  RegisterNicknameReturns,
  RegisterParams,
  RegisterReturns,
} from "../interfacaes/registerApi.interface";
import { set_user_info } from "./userTestApi";

const registerTestApi: RegisterApi = {
  register_nickname: ({
    id,
    nickname,
  }: RegisterNicknameParams): RegisterNicknameReturns => {
    if (nickname === "succ") {
      set_user_info({ nickname: nickname });
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
