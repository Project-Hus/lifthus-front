export type QueryProgramDto = {};

export type CreateProgramDto = {
  programType: string;
  title: string;
  author: string;

  parentProgram?: string;
  parentVersion?: number;

  imageSrcs: string[];
  text: string;

  routines: CreateRoutineDto[];
};

export type CreateRoutineDto = {
  day: number;
  routineActs: CreateRoutineActDto[];
};

export type CreateRoutineActDto = {
  order: number;
  actCode: string;
  stage: string;
  repsOrMeters: number;
  ratioOrSecs: number;
};
