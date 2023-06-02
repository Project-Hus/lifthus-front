import { exerciseDB, programDB } from "../../api/mocks/routineApi.mock";

export interface programInfo {
  id: number;
  author: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  trainingType: string;
  images?: string[];
  description: string;
  likenum: number;
  starednum: number;
  routineName: string;
  timer?: number;
  sets?: number;
  weight?: number;
  setProgramInfo: (info: programDB) => void;
}
export interface day {
  dayname?: string;
  exerciseList?: exerciseDB[];
}
export interface week {
  idx?: number;
  days?: day[];
}
export interface plan {
  weeks: week[];
}
export interface programPlanInfo {
  programInfo: programDB;
  plan: plan;
  setProgramPlanInfo: (info: programDB) => void;
  setWeekInfo: (weeks: week[]) => void;
  //   setDayInfo: ({ days, week }: { days: day[]; week: week }) => void;
  //   setExerciseInfo: ({
  //     week,
  //     dayname,
  //     exerciseList,
  //   }: {
  //     week: week;
  //     dayname: string;
  //     exerciseList: exerciseDB[];
  //   }) => void;
}
