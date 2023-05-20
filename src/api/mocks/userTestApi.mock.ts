/* Mock server */
export interface UserProfileDB {
  uid: number;
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
  created_at: Date;
  updated_at: Date;
}

const user_list: { [key: number]: UserProfileDB } = {
  100: {
    uid: 100,
    registered: true,
    registered_at: new Date(),
    username: "succregi",
    email: "lifthus531@gmail.com",
    email_verified: true,
    name: "이정훈",
    given_name: "정훈",
    family_name: "이",
    birthdate: new Date("1998-04-25"),
    profile_image_url: "https://avatars.githubusercontent.com/u/48755175?v=4",
    created_at: new Date("2003-02-03"),
    updated_at: new Date("2005-04-25"),
  },
  101: {
    uid: 100,
    registered: false,
    registered_at: null,
    username: "succ",
    email: "lifthus531@gmail.com",
    email_verified: true,
    name: "이정훈",
    given_name: "정훈",
    family_name: "이",
    birthdate: new Date("1998-04-25"),
    profile_image_url: "https://avatars.githubusercontent.com/u/48755175?v=4",
    created_at: new Date("2003-02-03"),
    updated_at: new Date("2005-04-25"),
  },
};

export default user_list;
