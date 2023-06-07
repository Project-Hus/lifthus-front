export type QueryProgramDto = {
  id: number;
  title: string;
  slug: string;
  type: string;
  author: number;
  image?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type QueryWeeklyProgramDto = {
  id: number;
  title: string;
  slug: string;
  type: string;
  author: number;
  description: string;
  created_at: string;
  updated_at: string;
  edges: {
    tags: QueryTagDto[];
    weekly_routines: QueryWeeklyRoutineDto[];
  };
};

export type QueryTagDto = {
  id: number;
  name: string;
};

export type QueryWeeklyRoutineDto = {
  id: number;
  program_id: number;
  week: number;
  created_at: string;
  updated_at: string;
  edges: {
    daily_routines: QueryDailyRoutineDto[];
  };
};

export type QueryDailyRoutineDto = {
  id: number;
  program_id: number;
  weekly_routine_id: number;
  day: number;
  created_at: string;
  updated_at: string;
  edges: {
    routine_acts: QueryRoutineActDto[];
  };
};

export type QueryRoutineActDto = {
  id: number;
  act_id: number;
  daily_routine_id: number;
  order: number;
  w_ratio?: number;
  reps?: number;
  lap?: number;
  warmup: boolean;
  created_at: string;
  updated_at: string;
};

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
