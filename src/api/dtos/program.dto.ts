export type QueryProgramDto = {};

export type CreateProgramDto = {
  programType: string;
  title: string;
  author: string;
  derivedFrom?: string;

  imageSrcs: string[];
  text: string;

  dailyRoutines: CreateDailyRoutineDto[];
};

export type CreateDailyRoutineDto = {
  day: number;
  routineActs: CreateRoutineActDto[];
};

export type CreateRoutineActDto = {
  order: number;
  actVersion: string;
  stage: string;
  repsOrMeters: number;
  ratioOrSecs: number;
};
