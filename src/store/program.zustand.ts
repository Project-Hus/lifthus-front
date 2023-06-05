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
  //Parial<programDB> : programDB의 일부 속성만 setProgramPlanInfo함수에 {속성: value} 넣어서 변경 시킬 수 있다.
  setProgramPlanInfo: (partialProgram: Partial<programDB>) => void;
  resetProgramPlanInfo: () => void;
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
  //페이지 이동 시 현재 작성 중 정보 초기화 하기 위한 함수
  resetProgramPlanInfo: () => {
    set(() => ({
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
    }));
  },
}));

export default useProgramPlanStore;
