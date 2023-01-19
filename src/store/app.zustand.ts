import { create } from "zustand";
import { app_info } from "./interfaces/app.interface";

interface AppState {
  user_id: string;
  registered: boolean;
  set_user_info: (info: app_info) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user_id: "",
  registered: false,
  set_user_info: (info: app_info) =>
    set({
      user_id: info?.user_id,
      registered: info?.registered,
    }),
}));

export default useAppStore;
