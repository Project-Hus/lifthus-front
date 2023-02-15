import { RegisterParams } from "../interfacaes/registerApi.interface";
import { UserApi, UserProfile } from "../interfacaes/userApi.interface";

/* Mock server */
export let user_profile: UserProfile = {
  user_id: "",
  registered: false,
  username: "",
  training_type: "",
  body_weight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
};

export const set_user_info = (new_user_info: RegisterParams | UserProfile) => {
  user_profile = { ...user_profile, ...new_user_info };
};
/* Mock Server */

const userTestApi: UserApi = {
  get_user_info: (id: string): UserProfile => {
    return { ...user_profile };
  },
};
export default userTestApi;
