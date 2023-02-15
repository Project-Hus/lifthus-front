import { number, string } from "yargs";
import { create } from "zustand";
import { UserInfo } from "./interfaces/user.interface";

interface UserState {
  user_id: string;
  registered: boolean;
  username: string;
  training_type: string;
  body_weight: number;
  fat_percentage: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
  set_user_info: (info: UserInfo) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user_id: "",
  registered: false,
  username: "",
  training_type: "",
  body_weight: NaN,
  fat_percentage: NaN,
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
