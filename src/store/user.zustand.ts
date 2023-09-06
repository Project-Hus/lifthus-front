import { create } from "zustand";
import { UserDto } from "../api/dtos/user.dto";

interface UserState {
  uid: string;
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
  setUserInfo: (info: UserDto) => void;
  setUsername: (username: string) => void;
  signOut: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  uid: "",
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

  setUserInfo: (info: UserDto) =>
    set((state) => ({
      ...state,
      ...info,
    })),
  setUsername: (username: string) => set((state) => ({ ...state, username })),
  signOut: () =>
    set(() => ({
      uid: "",
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
    })),
}));

export default useUserStore;
