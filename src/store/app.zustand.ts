import { number, string } from "yargs";
import { create } from "zustand";
import { app_info } from "./interfaces/app.interface";

interface AppState {
  user_id: string;
  registered: boolean;
  nickname: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
  set_user_info: (info: app_info) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user_id: "",
  registered: false,
  nickname: "",
  training_type: "",
  body_weight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
  set_user_info: (info: app_info) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useAppStore;
