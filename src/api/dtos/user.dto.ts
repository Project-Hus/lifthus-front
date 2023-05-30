export type GetUserInfoDto = {
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

  usercode: string;
  company: string;
  location: string;
  contact: string;
};

export type UpdateUserInfoDto = {
  uid: number;
  username?: string;
  birthdate?: Date;

  company?: string;
  location?: string;
  contact?: string;
};
