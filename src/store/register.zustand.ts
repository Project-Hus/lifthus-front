import { create } from "zustand";
import { RegisterNumberType } from "./interfaces/register.interface";

interface RegisterState {
  username: string;
  type: string;
  registerBodyWeight: number;
  registerHeight: number;
  registerSquat: number;
  registerBenchpress: number;
  registerDeadlift: number;
  // setRegisterInfo: (info: RegisterInfo) => void;
  registerUsername: (username: string) => void;
  registerNumber: (regiNum: RegisterNumberType) => void;
  registerType: (type: string) => void;
  setBodyWeight: (bodyWeight: number) => void;
  setHeight: (height: number) => void;
  setSquat: (squat: number) => void;
  setBenchpress: (benchpress: number) => void;
  setDeadlift: (deadlift: number) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  username: "",
  type: "",
  registerBodyWeight: NaN,
  registerHeight: NaN,
  registerSquat: NaN,
  registerBenchpress: NaN,
  registerDeadlift: NaN,
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
  setBodyWeight: (bodyWeight: number) =>
    set((state) => ({ ...state, registerBodyWeight: bodyWeight })),
  setHeight: (height: number) =>
    set((state) => ({ ...state, registerHeight: height })),
  setSquat: (squat: number) =>
    set((state) => ({ ...state, registerSquat: squat })),
  setBenchpress: (benchpress: number) =>
    set((state) => ({ ...state, registerBenchpress: benchpress })),
  setDeadlift: (deadlift: number) =>
    set((state) => ({ ...state, registerDeadlift: deadlift })),
}));

export default useRegisterStore;
