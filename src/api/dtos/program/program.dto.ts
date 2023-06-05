export type CreateWeeklyProgramDto = {
  title: string;
  author: number;
  image?: string;
  description?: string;
  tags: string[];
  weekly_routines: CreateWeeklyRoutineDto[];
  daily_routines: CreateWeeklyDailyRoutineDto[];
  routine_acts: CreateWeeklyRoutineActDto[];
};

export type CreateWeeklyRoutineDto = {
  week: number;
};

export type CreateWeeklyDailyRoutineDto = {
  week: number;
  day: number;
};

export type CreateWeeklyRoutineActDto = {
  week: number;
  day: number;

  act_id: number;
  order: number;

  w_ratio?: number;
  reps?: number;
  lap?: number;
  warmup: boolean;
};
