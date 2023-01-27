import {
  register_nickname_form,
  register_nickname_out,
} from "../interfacaes/registerApi.interface";

const registerTestApi: any = {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form): register_nickname_out => {
    if (nickname === "succ") return { ok: true };
    return { ok: false };
  },
};
export default registerTestApi;
