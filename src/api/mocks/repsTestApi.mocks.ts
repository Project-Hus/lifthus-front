import { RepContent } from "../interfaces/repsApi.interface";

/*
  rep_id?: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  routine_id?: number;
  image_paths?: string[];
  text: string;
*/

const rep_list: { [key: number]: RepContent } = {
  1: {
    rep_id: 1,
    created_at: new Date("2023-01-03"),
    updated_at: new Date("2023-01-03"),
    user_id: "succregi",
    image_srcs: [
      "https://i.pinimg.com/originals/f0/c9/84/f0c9842b43c97fb7412c8cd99ca5218d.jpg",
    ],
    text: "Hello I love powerlifting and British singer with a flow Ed Sheeran.",
  },
  2: {
    rep_id: 2,
    created_at: new Date("2023-01-05"),
    updated_at: new Date("2023-01-05"),
    user_id: "succregi",
    text: "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
  },
};

export default rep_list;
