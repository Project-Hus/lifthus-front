import { create } from "zustand";
import { exerciseDB, programDB } from "../api/mocks/routineApi.mock";
import {
  day,
  programInfo,
  programPlanInfo,
  week,
} from "./interfaces/program.interface";
//make interface for useProgramStore

import { produce } from "immer";

//현재 조회중인 프로그램과 일정에 대한 정보를 담고 있다.
export const useProgramPlanStore = create<programPlanInfo>()((set) => ({
  programInfo: {
    id: 0,
    author: 0,
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    trainingType: "",
    images: [],
    description: "",
    likenum: 0,
    starednum: 0,
    routineName: "",
    timer: 0,
  },
  plan: {
    weeks: [],
  },
  setProgramPlanInfo: (info: programDB) =>
    set((state) => ({
      ...state,
      ...info,
    })),

  setWeekInfo: (weeks: week[]) =>
    set((state) => ({
      ...state,
      plan: {
        weeks: weeks,
      },
    })),
}));

//현재 조회중인 프로그램의 일정을 포함한 모든 정보
const useProgramStore = create<programInfo>()((set) => ({
  id: 0,
  author: 0,
  date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
  trainingType: "",
  images: [],
  description: "",
  likenum: 0,
  starednum: 0,
  routineName: "",
  timer: 0,
  setProgramInfo: (info: programDB) =>
    set((state) => ({
      ...state,
      ...info,
    })),
}));

export default useProgramStore;
