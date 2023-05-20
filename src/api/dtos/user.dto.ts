export type GetUserInfoDto = {
  id: number;
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
};
