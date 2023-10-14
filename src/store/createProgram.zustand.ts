import { create } from "zustand";

interface CreateProgramState {
  programType: "none" | "weekly" | "daily";
  title: string;
  author: string;
  derivedFrom?: string | undefined;
  imageSrcs: string[];
  text: string;
  dailyRoutines: CreateDailyRoutineState[];
  setType: (type: "none" | "weekly" | "daily") => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setDerivedFrom: (derivedFrom: string) => void;
  setImageSrcs: (imageSrcs: string[]) => void;
  setText: (text: string) => void;

  removeDailyRoutine: (day: number) => void;
  addRoutineAct: (day: number, ra: CreateRoutineActState) => void;
}

type CreateDailyRoutineState = {
  day: number;
  routineActs: CreateRoutineActState[];
};

export type CreateRoutineActState = {
  actVersion: string;
  stage: "warmup" | "main" | "cooldown";
  repsOrMeters: number;
  ratioOrSecs: number;
};

const useProgramCreationStore = create<CreateProgramState>()((set) => ({
  programType: "none",
  title: "",
  author: "",
  derivedFrom: undefined,
  imageSrcs: [],
  text: "",
  dailyRoutines: [],
  setType: (type: "none" | "weekly" | "daily") =>
    set((state) => {
      if (type === "none") state.dailyRoutines = [];
      return { ...state, programType: type };
    }),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setAuthor: (author: string) => set((state) => ({ ...state, author })),
  setDerivedFrom: (derivedFrom: string) =>
    set((state) => ({ ...state, derivedFrom })),
  setImageSrcs: (imageSrcs: string[]) =>
    set((state) => ({ ...state, imageSrcs })),
  setText: (text: string) => set((state) => ({ ...state, text })),
  removeDailyRoutine: (day: number) =>
    set((state) => {
      const prev = state.dailyRoutines;
      const cur = prev.filter((dr) => dr.day !== day);
      return { ...state, dailyRoutines: cur };
    }),
  addRoutineAct: (day: number, ra: CreateRoutineActState) =>
    set((state) => {
      const prevDRs = state.dailyRoutines;
      let targetDR: CreateDailyRoutineState | undefined = prevDRs.find(
        (dr) => dr.day === day
      );
      if (!targetDR) {
        targetDR = { day, routineActs: [ra] };
        const newDRs = [...prevDRs, targetDR];
        newDRs.sort((a, b) => a.day - b.day);
        return { ...state, dailyRoutines: newDRs };
      }
      targetDR.routineActs.push(ra);
      const newDRs = [...prevDRs];
      return { ...state, dailyRoutines: newDRs };
    }),
}));

export default useProgramCreationStore;
