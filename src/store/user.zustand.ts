import { number, string } from "yargs";
import { create } from "zustand";
import { UserInfo } from "./interfaces/user.interface";

interface UserState {
  user_id: string;
  registered: boolean;
  nickname: string;
  training_type: string;
  body_weight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
  set_user_info: (info: UserInfo) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user_id: "",
  registered: false,
  nickname: "",
  training_type: "",
  body_weight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
  set_user_info: (info: UserInfo) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useUserStore;
