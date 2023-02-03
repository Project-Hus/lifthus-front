import { register_info } from "../store/interfaces/register.interface";

import {
  registerApi_form,
  register_nickname_form,
  register_nickname_out,
  register_out,
} from "./interfacaes/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: registerApi_form = {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form): register_nickname_out => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_nickname({ id, nickname });
    }
    return { ok: false };
  },
  register: (
    register_info: { user_id: string } & register_info
  ): register_out => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return { ok: false };
  },
};

export default registerApi;
