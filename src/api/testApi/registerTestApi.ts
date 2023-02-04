import {
  registerApi_form,
  register_form,
  register_nickname_form,
  register_nickname_out,
  register_out,
} from "../interfacaes/registerApi.interface";
import { set_user_info, user_info } from "./authTestApi";

const registerTestApi: registerApi_form = {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form): register_nickname_out => {
    if (nickname === "succ") {
      user_info.nickname = nickname;
      return { ok: true };
    }
    return { ok: false };
  },
  register: (register_info: register_form): register_out => {
    const new_info = { registered: true, ...register_info };
    set_user_info(new_info);
    return { ok: true };
  },
};
export default registerTestApi;
