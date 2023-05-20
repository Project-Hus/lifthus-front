export type RecDB = {
  author: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  trainingType: string;
  bodyWeight: number;
  height: number;
  squat: number;
  benchpress: number;
  deadlift: number;
};

export const recList: RecDB[] = [
  {
    author: 100,
    date: new Date("2021-01-01"),
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    trainingType: "powerlifting",
    bodyWeight: 80,
    height: 180,
    squat: 100,
    benchpress: 100,
    deadlift: 100,
  },
  {
    author: 100,
    date: new Date("2021-01-01"),
    created_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01"),
    trainingType: "powerlifting",
    bodyWeight: 80,
    height: 180,
    squat: 100,
    benchpress: 100,
    deadlift: 100,
  },
];
