import { actDB, programDB } from "../../store/interfaces/program.interface";

export const exerciseList: actDB[] = [
  {
    id: 100,
    author: 100,
    images: ["https://bit.ly/sage-adebayo"],
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    tag: ["strength"],
    description: "This is a description",
    name: "testExercise",
    order: 1,
    type: "repeat",
  },
  {
    id: 101,
    author: 101,
    images: ["https://bit.ly/sage-adebayo"],
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    tag: ["strength"],
    description: "This is a descriptiondddddddddd dddd",
    name: "testExercise222",
    order: 2,
    type: "simple",
  },
];

export const programList: programDB[] = [
  {
    id: 100,
    author: 100,
    images: ["https://bit.ly/sage-adebayo"],
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    name: "test",
    tag: ["strength"],
    description: "This is a description",
    likenum: 10,
    starnum: 10,
    weeks: [1, 2, 3],
    days: [
      {
        dayNum: 0,
        week: 2,
      },
    ],
    acts: [],
  },
  {
    id: 101,
    author: 100,
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    tag: ["powerlifting"],
    description: "This is a description",
    likenum: 10,
    starnum: 30,
    name: "test2",
    weeks: [],
    days: [],
    acts: [],
  },
];
