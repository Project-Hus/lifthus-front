import { create } from "zustand";
import { UserInfo } from "./interfaces/user.interface";

interface UserState {
  uid?: number;
  registered: boolean;
  registered_at?: Date | null;
  username?: string;
  email: string;
  email_verified: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  birthdate?: Date;
  profile_image_url?: string;
  created_at?: Date;
  updated_at?: Date;
  set_user_info: (info: UserInfo) => void;
}

const useUserStore = create<UserState>()((set) => ({
  uid: NaN,
  registered: false,
  registered_at: null,
  username: "",
  email: "",
  email_verified: false,
  name: "",
  given_name: "",
  family_name: "",
  birthdate: undefined,
  profile_image_url: "",
  created_at: undefined,
  updated_at: undefined,

  set_user_info: (info: UserInfo) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useUserStore;
