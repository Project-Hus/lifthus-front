import { create } from "zustand";

import { register_info } from "./interfaces/register.interface";

interface RegisterState {
  register_nickname: string;
  register_type: string;
  set_register_info: (info: register_info) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  register_nickname: "",
  register_type: "",
  set_register_info: (info: register_info) =>
    set((state) => ({
      register_nickname: info?.register_nickname || state.register_nickname,
      register_type: info?.register_type || state.register_type,
    })),
}));

export default useRegisterStore;
