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
    order: 0,
    type: "time",
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
    weeks: [{ weeknum: 1 }, { weeknum: 2 }, { weeknum: 3 }],
    days: [
      {
        dayNum: 1,
        week: 2,
      },
      {
        dayNum: 2,
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
export interface routineAct {
  act_id: number;
  day: number;
  lap: number;
  order: number;
  reps: number;
  w_ratio: number;
  warmup: boolean;
  week: number;
}

export const routineActList: routineAct[] = [
  {
    act_id: 1,
    day: 1,
    lap: 2,
    order: 1,
    reps: 10,
    w_ratio: 0.75,
    warmup: true,
    week: 1,
  },
  {
    act_id: 2,
    day: 3,
    lap: 1,
    order: 2,
    reps: 8,
    w_ratio: 0.8,
    warmup: false,
    week: 2,
  },
  {
    act_id: 3,
    day: 2,
    lap: 1,
    order: 3,
    reps: 12,
    w_ratio: 0.85,
    warmup: true,
    week: 1,
  },
  {
    act_id: 4,
    day: 4,
    lap: 3,
    order: 2,
    reps: 6,
    w_ratio: 0.9,
    warmup: false,
    week: 3,
  },
  {
    act_id: 5,
    day: 2,
    lap: 2,
    order: 1,
    reps: 8,
    w_ratio: 0.75,
    warmup: true,
    week: 2,
  },
];
