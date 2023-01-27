import { create } from "zustand";

import { register_info } from "./interfaces/register.interface";

interface RegisterState {
  register_nickname: string;

  set_register_info: (info: register_info) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  register_nickname: "",
  set_register_info: (info: register_info) =>
    set({
      register_nickname: info?.register_nickname,
    }),
}));

export default useRegisterStore;
