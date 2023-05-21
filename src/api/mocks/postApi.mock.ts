import { QueryPostDto } from "../dtos/post.dto";
import commentList from "./commentApi.mock";

export const postState = {
  nextPid: 102,
};

const postList: QueryPostDto[] = [
  {
    id: 100,
    author: 100,
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
    slug: "tmpslug",
    images: [
      "https://i.pinimg.com/originals/f0/c9/84/f0c9842b43c97fb7412c8cd99ca5218d.jpg",
    ],
    content:
      "Hello I love powerlifting and British singer with a flow Ed Sheeran.",
    likenum: 5,
  },
  {
    id: 101,
    author: 100,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
    slug: "tmpslug2",
    images: [],
    content:
      "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
    likenum: 3,
  },
];

export default postList;
