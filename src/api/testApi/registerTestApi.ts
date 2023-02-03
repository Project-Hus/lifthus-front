import { register_info } from "../../store/interfaces/register.interface";
import {
  registerApi_form,
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
  register: (
    register_info: { user_id: string } & register_info
  ): register_out => {
    set_user_info(register_info);
    return { ok: true };
  },
};
export default registerTestApi;
