export type QueryProgramDto = {
  code: string;
  programType: string;
  title: string;
  author: string;
  createdAt: string;
  parentProgramCode?: string;
  parentVersion?: number;
  releases: QueryProgramReleaseDto[];
};

export type QueryProgramReleaseDto = {
  version: number;
  createdAt: string;
  text: string;
  imageSrcs: string[];
  routines: QueryRoutineDto[];
};

export type QueryRoutineDto = {
  day: number;
  routineActs: QueryRoutineActDto[];
};

export type QueryRoutineActDto = {
  order: number;
  actCode: string;
  stage: string;
  repsOrMeters: number;
  ratioOrSecs: number;
};

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
