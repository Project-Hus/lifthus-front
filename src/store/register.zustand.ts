import { create } from "zustand";
import { RegisterNumberType } from "./interfaces/register.interface";

interface RegisterState {
  username: string;
  type: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
  // setRegisterInfo: (info: RegisterInfo) => void;
  registerUsername: (username: string) => void;
  registerNumber: (regiNum: RegisterNumberType) => void;
  registerType: (type: string) => void;
  registerBodyWeight: (bodyWeight: number) => void;
  registerHeight: (height: number) => void;
  registerSquat: (squat: number) => void;
  registerBenchpress: (benchpress: number) => void;
  registerDeadlift: (deadlift: number) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  username: "",
  type: "",
  bodyWeight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
  // setRegisterInfo: (info: RegisterInfo) =>
  //   set((state) => ({
  //     ...state,
  //     ...info,
  //   })),
  registerUsername: (username: string) =>
    set((state) => ({ ...state, username })),
  registerNumber: (regiNum: RegisterNumberType) =>
    set((state) => ({ ...state, ...regiNum })),
  registerType: (type: string) => set((state) => ({ ...state, type })),
  registerBodyWeight: (bodyWeight: number) =>
    set((state) => ({ ...state, bodyweight: bodyWeight })),
  registerHeight: (height: number) =>
    set((state) => ({ ...state, height: height })),
  registerSquat: (squat: number) =>
    set((state) => ({ ...state, squat: squat })),
  registerBenchpress: (benchpress: number) =>
    set((state) => ({ ...state, benchpress: benchpress })),
  registerDeadlift: (deadlift: number) =>
    set((state) => ({ ...state, deadlift: deadlift })),
}));

export default useRegisterStore;
