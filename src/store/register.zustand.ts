import { create } from "zustand";

import { register_info } from "./interfaces/register.interface";

interface RegisterState {
  register_nickname: string;
  register_type: string;
  register_bodyweight: number;
  register_height: number;
  register_squat: number;
  register_benchpress: number;
  register_deadlift: number;
  set_register_info: (info: register_info) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  register_nickname: "",
  register_type: "",
  register_bodyweight: NaN,
  register_height: NaN,
  register_squat: NaN,
  register_benchpress: NaN,
  register_deadlift: NaN,
  set_register_info: (info: register_info) =>
    set((state) => ({
      register_nickname: info?.register_nickname || state.register_nickname,
      register_type: info?.register_type || state.register_type,
      register_bodyweight:
        info?.register_bodyweight || state.register_bodyweight,
      register_height: info?.register_height || state.register_height,
      register_squat: info?.register_squat || state.register_squat,
      register_benchpress:
        info?.register_benchpress || state.register_benchpress,
      register_deadlift: info?.register_deadlift || state.register_deadlift,
    })),
}));

export default useRegisterStore;
