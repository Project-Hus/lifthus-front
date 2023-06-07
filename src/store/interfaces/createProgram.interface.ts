import { QueryActDto } from "../../api/dtos/program/act.dto";

export type UpdateWeeklyProgram = {
  title?: string;
  author?: number;
  image?: string;
  description?: string;
};

export type NewWeeklyRoutineAct = {
  week: number;
  day: number;

  act: QueryActDto;
};

export type UpdateWeeklyRoutineAct = {
  w_ratio?: number;
  reps?: number;
  lap?: number;
  warmup?: boolean;
};

export type NewProgramInfoStrings = "title" | "image" | "tag" | "description";
