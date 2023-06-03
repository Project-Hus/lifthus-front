import { create } from "zustand";
import { programDB, week } from "./interfaces/program.interface";
//make interface for useProgramStore

import { produce } from "immer";

export interface programInfo {
  program: programDB;
  setProgramInfo: (info: programDB) => void;

  //하루 단위 동안 act 에도 순서가 있다. index로
}

export interface programPlanInfo {
  program: programDB;
  setProgramPlanInfo: (partialProgram: Partial<programDB>) => void;
}

//현재 조회중인 프로그램과 일정에 대한 정보를 담고 있다.
export const useProgramPlanStore = create<programPlanInfo>((set) => ({
  program: {
    id: 0,
    author: 0,
    created_at: new Date(),
    updated_at: new Date(),
    tag: [],
    images: [],
    description: "",
    likenum: 0,
    starnum: 0,
    name: "",
    timer: 0,
    weeks: [],
    days: [],
    acts: [],
  },

  setProgramPlanInfo: (partialProgram) => {
    set((state) => ({
      ...state,
      program: {
        ...state.program,
        ...partialProgram,
      },
    }));
  },
}));

export default useProgramPlanStore;
