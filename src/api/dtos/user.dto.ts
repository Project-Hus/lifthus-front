export class UserDto {
  uid: string;
  registered: boolean;
  registered_at?: Date | null;
  username?: string;
  email: string;
  email_verified: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  profile_image_url?: string;

  created_at: Date;
  updated_at: Date;

  usercode: string;
  company: string;
  location: string;
  contact: string;
  constructor(u: UserJSON) {
    this.uid = String(u.uid);
    this.registered = u.registered;
    this.registered_at = !!u.registered_at ? new Date(u.registered_at) : null;
    this.username = u.username;
    this.email = u.email;
    this.email_verified = u.email_verified;
    this.name = u.name;
    this.given_name = u.given_name;
    this.family_name = u.family_name;
    this.profile_image_url = u.profile_image_url;
    this.created_at = new Date(u.created_at);
    this.updated_at = new Date(u.updated_at);
    this.usercode = u.usercode;
    this.company = u.company;
    this.location = u.location;
    this.contact = u.contact;
  }
}

export type UserJSON = {
  uid: string;

  registered: boolean;
  registered_at?: string | null;

  username?: string;

  email: string;
  email_verified: boolean;

  name?: string;
  given_name?: string;
  family_name?: string;

  profile_image_url?: string;

  created_at: string;
  updated_at: string;

  usercode: string;
  company: string;
  location: string;
  contact: string;
};

export type UpdateUserInfoDto = {
  uid: string;
  username?: string;
  birthdate?: Date;

  company?: string;
  location?: string;
  contact?: string;
};
