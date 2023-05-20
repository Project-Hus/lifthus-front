import { create } from "zustand";
import { RegisterInfo } from "./interfaces/register.interface";

interface RegisterState {
  registerUsername: string;
  registerType: string;
  registerBodyweight: number;
  registerHeight: number;
  registerSquat: number;
  registerBenchpress: number;
  registerDeadlift: number;
  set_register_info: (info: RegisterInfo) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  registerUsername: "",
  registerType: "",
  registerBodyweight: NaN,
  registerHeight: NaN,
  registerSquat: NaN,
  registerBenchpress: NaN,
  registerDeadlift: NaN,
  set_register_info: (info: RegisterInfo) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useRegisterStore;
