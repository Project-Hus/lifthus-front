import {
  register_nickname_form,
  register_nickname_out,
} from "../interfacaes/registerApi.interface";
import { user_info } from "./authTestApi";

const registerTestApi: any = {
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
};
export default registerTestApi;
