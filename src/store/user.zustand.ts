import { create } from "zustand";
import { UserInfo } from "./interfaces/user.interface";

interface UserState {
  userId: string;
  userName: string;
  registered: boolean;
  username: string;
  trainingType: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
  set_user_info: (info: UserInfo) => void;
}

const useUserStore = create<UserState>()((set) => ({
  userId: "",
  userName: "", // user's actual name
  registered: false,
  username: "",
  trainingType: "",
  bodyWeight: NaN,
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
