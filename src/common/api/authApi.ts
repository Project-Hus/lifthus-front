interface sign_up_intf {
  id: string;
  password: string;
}

const authApi: any = {
  sign_in_local: (
    id: string,
    password: string
  ): { id: string; ok: boolean } => {
    // validate it.
    return { id: id, ok: true }; // ok is borrowed from ok idiom of Go.
  },

  sign_up_local: ({
    id,
    password,
  }: sign_up_intf): { fid: boolean; ok: boolean } => {
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

export default authApi;
