import { create } from "zustand";

interface CreateProgramState {
  programType: "none" | "weekly" | "";
  title: string;
  author: string;
  derivedFrom?: string | undefined;
  imageSrcs: string[];
  text: string;
  routines: CreateRoutineState[];
  setType: (type: "none" | "weekly" | "") => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setDerivedFrom: (derivedFrom: string) => void;
  setImageSrcs: (imageSrcs: string[]) => void;
  setText: (text: string) => void;

  removeRoutine: (day: number) => void;

  addRoutineAct: (day: number, ra: CreateRoutineActState) => void;
  removeRoutineAct: (day: number, order: number) => void;

  moveRoutineActForward: (day: number, order: number) => void;
  moveRoutineActBackward: (day: number, order: number) => void;
}

type CreateRoutineState = {
  day: number;
  routineActs: CreateRoutineActState[];
};

export type CreateRoutineActState = {
  actCode: string;
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
  routines: [],
  setType: (type: "none" | "weekly" | "") =>
    set((state) => {
      if (type === "none") state.routines = [];
      return { ...state, programType: type };
    }),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setAuthor: (author: string) => set((state) => ({ ...state, author })),
  setDerivedFrom: (derivedFrom: string) =>
    set((state) => ({ ...state, derivedFrom })),
  setImageSrcs: (imageSrcs: string[]) =>
    set((state) => ({ ...state, imageSrcs })),
  setText: (text: string) => set((state) => ({ ...state, text })),
  removeRoutine: (day: number) =>
    set((state) => {
      const prev = state.routines;
      const cur = prev.filter((dr) => dr.day !== day);
      return { ...state, Routines: cur };
    }),
  addRoutineAct: (day: number, ra: CreateRoutineActState) =>
    set((state) => {
      const prevDRs = state.routines;
      let targetDR: CreateRoutineState | undefined = prevDRs.find(
        (dr) => dr.day === day
      );
      if (!targetDR) {
        targetDR = { day, routineActs: [ra] };
        const newDRs = [...prevDRs, targetDR];
        newDRs.sort((a, b) => a.day - b.day);
        return { ...state, Routines: newDRs };
      }
      targetDR.routineActs.push(ra);
      const newDRs = [...prevDRs];
      return { ...state, Routines: newDRs };
    }),

  removeRoutineAct: (day: number, order: number) =>
    set((state) => {
      const targetRoutineIdx = state.routines.findIndex((r) => r.day === day);
      if (targetRoutineIdx === -1) return { ...state };
      state.routines[targetRoutineIdx].routineActs = state.routines[
        targetRoutineIdx
      ].routineActs
        .splice(0, order - 1)
        .concat(state.routines[targetRoutineIdx].routineActs.splice(order));
      return { ...state };
    }),
  moveRoutineActForward: (day: number, order: number) =>
    set((state) => {
      return { ...state };
    }),
  moveRoutineActBackward: (day: number, order: number) =>
    set((state) => {
      return { ...state };
    }),
}));

export default useProgramCreationStore;
