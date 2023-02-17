import { RepContent } from "../interfacaes/repsApi.interface";

/*
  rep_id?: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  routine_id?: number;
  image_paths?: string[];
  text: string;
*/

const rep_list: RepContent[] = [
  {
    rep_id: 1,
    created_at: new Date("2023-01-03"),
    updated_at: new Date("2023-01-03"),
    user_id: "succregi",
    text: "Hello I love powerlifting and British singer with a flow Ed Sheeran.",
  },
  {
    rep_id: 2,
    created_at: new Date("2023-01-05"),
    updated_at: new Date("2023-01-05"),
    user_id: "succregi",
    text: "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
  },
];

export default rep_list;
