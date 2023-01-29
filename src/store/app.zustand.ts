import { create } from "zustand";
import { app_info } from "./interfaces/app.interface";

interface AppState {
  user_id: string;
  registered: boolean;
  nickname: string;
  set_user_info: (info: app_info) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user_id: "",
  registered: false,
  nickname: "",
  set_user_info: (info: app_info) =>
    set((state) => ({
      user_id: info?.user_id || state.user_id,
      registered: info?.registered || state.registered,
      nickname: info?.nickname || state.nickname,
    })),
}));

export default useAppStore;
