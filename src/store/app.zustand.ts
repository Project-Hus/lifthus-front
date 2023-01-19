import { create } from "zustand";

interface AppState {
  user_id: string | null;
  set_id: (id: string) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user_id: "",
  set_id: (id) => set({ user_id: id }),
}));

export default useAppStore;
