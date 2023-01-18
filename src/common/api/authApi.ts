export interface sign_form {
  id: string;
  password: string;
}

export interface sign_in_out {
  id: string;
  ok: boolean;
}

export interface sign_up_out {
  fid: boolean;
  ok: boolean;
}

const authTestApi: any = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
    let user_id = "";
    let ok = false;
    switch (id) {
      case "succ":
        if (password == id) {
          user_id = "succ";
          ok = true;
        }
        break;
      default:
        user_id = "";
        ok = false;
        break;
    }
    return { id: user_id, ok };
  },

  sign_up_local: ({ id, password }: sign_form): sign_up_out => {
    let fid = false;
    let ok = false;
    switch (id) {
      case "succ":
        fid = false;
        ok = true;
        break;
      case "fidd":
        fid = true;
        ok = false;
        break;
      default:
        fid = false;
        ok = false;
        break;
    }
    return { fid, ok };
  },
};

const authApi: any = {
  sign_in_local: ({ id, password }: sign_form): sign_in_out => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_in_local({ id, password });
    }
    return { id: "", ok: false };
  },
  sign_up_local: ({ id, password }: sign_form): sign_up_out => {
    if (process.env.NODE_ENV == "development") {
      return authTestApi.sign_up_local({ id, password });
    }
    return { fid: false, ok: false };
  },
};

export default authApi;
