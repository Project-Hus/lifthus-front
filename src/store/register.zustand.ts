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
  // setRegisterInfo: (info: RegisterInfo) => void;
  setUsername: (username: string) => void;
  setType: (type: string) => void;
  setBodyWeight: (bodyWeight: number) => void;
  setHeight: (height: number) => void;
  setSquat: (squat: number) => void;
  setBenchpress: (benchpress: number) => void;
  setDeadlift: (deadlift: number) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  registerUsername: "",
  registerType: "",
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
  setUsername: (username: string) =>
    set((state) => ({ ...state, registerUsername: username })),
  setType: (type: string) => set((state) => ({ ...state, registerType: type })),
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
