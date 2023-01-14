const userApi: Object = {
  sign_in_local: (
    id: string,
    password: string
  ): { id: string; ok: boolean } => {
    // validate it.
    return { id: id, ok: true }; // ok is borrowed from ok idiom of Go.
  },
  sign_up_local: (
    id: string,
    nickname: string,
    password: string
  ): { ok: boolean } => {
    // validate it.
    return { ok: true };
  },
};

export default userApi;
