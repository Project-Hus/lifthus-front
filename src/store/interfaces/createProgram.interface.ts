export type UpdateWeeklyProgram = {
  title?: string;
  author?: number;
  image?: string;
  description?: string;
};

export type NewWeeklyRoutineAct = {
  week: number;
  day: number;

  act_id: number;
};

export type UpdateWeeklyRoutineAct = {
  order?: number;

  w_ratio?: number;
  reps?: number;
  lap?: number;

  warmup?: boolean;
};

export type NewProgramInfoStrings = "title" | "image" | "tag" | "description";
