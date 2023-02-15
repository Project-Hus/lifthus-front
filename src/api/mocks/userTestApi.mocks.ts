import { UserProfile } from "../interfacaes/userApi.interface";
/* Mock server */
const user_list: { [key: string]: UserProfile } = {
  succregi: {
    user_id: "succregi",
    registered: true,
    username: "에드시런팬",
    training_type: "powerlifting",
    body_weight: 100,
    height: 184,
    squat: 160,
    benchpress: 120,
    deadlift: 180,
  },
  succ: {
    user_id: "succ",
    registered: false,
    username: "",
    training_type: "",
    body_weight: NaN,
    height: NaN,
    squat: NaN,
    benchpress: NaN,
    deadlift: NaN,
  },
};

export default user_list;
