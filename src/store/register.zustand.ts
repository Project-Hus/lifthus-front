import { create } from "zustand";
import { RegisterInfo } from "./interfaces/register.interface";

interface RegisterState {
  registerUsername: string;
  registerType: string;
  registerBodyWeight: number;
  registerHeight: number;
  registerSquat: number;
  registerBenchpress: number;
  registerDeadlift: number;
  setRegisterInfo: (info: RegisterInfo) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  registerUsername: "",
  registerType: "",
  registerBodyWeight: NaN,
  registerHeight: NaN,
  registerSquat: NaN,
  registerBenchpress: NaN,
  registerDeadlift: NaN,
  setRegisterInfo: (info: RegisterInfo) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useRegisterStore;
