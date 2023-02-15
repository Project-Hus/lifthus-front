import { create } from "zustand";

import { register_info } from "./interfaces/register.interface";

interface RegisterState {
  register_username: string;
  register_type: string;
  register_bodyweight: number;
  register_height: number;
  register_squat: number;
  register_benchpress: number;
  register_deadlift: number;
  set_register_info: (info: register_info) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  register_username: "",
  register_type: "",
  register_bodyweight: NaN,
  register_height: NaN,
  register_squat: NaN,
  register_benchpress: NaN,
  register_deadlift: NaN,
  set_register_info: (info: register_info) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useRegisterStore;
