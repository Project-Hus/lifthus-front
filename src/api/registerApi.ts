import {
  RegisterApi,
  RegisterNicknameParams,
  RegisterNicknameReturns,
  RegisterParams,
  RegisterReturns,
} from "./interfacaes/registerApi.interface";

import registerTestApi from "./testApi/registerTestApi";

const registerApi: RegisterApi = {
  register_nickname: ({
    id,
    nickname,
  }: RegisterNicknameParams): RegisterNicknameReturns => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register_nickname({ id, nickname });
    }
    return { ok: false };
  },
  register: (register_info: RegisterParams): RegisterReturns => {
    if (process.env.NODE_ENV == "development") {
      return registerTestApi.register(register_info);
    }
    return { ok: false };
  },
};

export default registerApi;
