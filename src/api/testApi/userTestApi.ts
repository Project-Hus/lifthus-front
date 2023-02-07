import { get_user_info_form } from "../interfacaes/authApi.interface";
import { register_form } from "../interfacaes/registerApi.interface";
import { userApi_form, UserProfile } from "../interfacaes/userApi.interface";

export let user_profile: UserProfile = {
  user_id: "",
  registered: false,
  nickname: "",
  training_type: "",
  body_weight: NaN,
  height: NaN,
  squat: NaN,
  benchpress: NaN,
  deadlift: NaN,
};

export const set_user_info = (register_user_info: register_form) => {
  user_profile = { ...user_profile, ...register_user_info };
};

const userTestApi: userApi_form = {
  get_user_info: (id: string): get_user_info_form => {
    return { ...user_profile };
  },
};
export default userTestApi;
