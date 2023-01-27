import { register_info } from "../store/interfaces/register.interface";

import {
  register_nickname_form,
  register_nickname_out,
} from "./interfacaes/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: any = {
  register_nickname: ({
    id,
    nickname,
  }: register_nickname_form): register_nickname_out => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_nickname({ id, nickname });
    }
    return { ok: true };
  },
};

export default registerApi;
