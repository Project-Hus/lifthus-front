import { create } from "zustand";

interface CreateProgramState {
  programType: "none" | "weekly" | "daily";
  title: string;
  author: string;
  derivedFrom?: string | undefined;
  imageSrcs: string[];
  text: string;
  routines: CreateRoutineState[];
  setType: (type: "none" | "weekly" | "daily") => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setDerivedFrom: (derivedFrom: string) => void;
  setImageSrcs: (imageSrcs: string[]) => void;
  setText: (text: string) => void;

  removeWeek: (week: number) => void;

  addRoutineAct: (day: number, ra: CreateRoutineActState) => void;
  removeRoutineAct: (day: number, order: number) => void;
  moveRoutineActForward: (day: number, order: number) => void;
  moveRoutineActBackward: (day: number, order: number) => void;

  setReps: (day: number, order: number, reps: number) => void;
  setMeters: (day: number, order: number, meters: number) => void;
  setRatio: (day: number, order: number, ratio: number) => void;
  setSecs: (day: number, order: number, secs: number) => void;
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
  setType: (type: "none" | "weekly" | "daily") =>
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
  removeWeek: (week: number) =>
    set((state) => {
      const week1st = (week - 1) * 7 + 1;
      const prev = state.routines;
      state.routines = prev.filter((dr) => dr.day < week1st);
      return { ...state };
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
        return { ...state, routines: newDRs };
      }
      targetDR.routineActs.push(ra);
      const newDRs = [...prevDRs];
      return { ...state, routines: newDRs };
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
      if (state.routines[targetRoutineIdx].routineActs.length === 0)
        state.routines = state.routines
          .splice(0, targetRoutineIdx)
          .concat(state.routines.splice(targetRoutineIdx + 1));
      return { ...state };
    }),
  moveRoutineActForward: (day: number, order: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      if (order === 1 || order > routineActs.length) return { ...state };
      const tmpRa = routineActs[order - 2];
      routineActs[order - 2] = routineActs[order - 1];
      routineActs[order - 1] = tmpRa;
      return { ...state };
    }),
  moveRoutineActBackward: (day: number, order: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      if (order >= routineActs.length || order < 1) return { ...state };
      const tmpRa = routineActs[order];
      routineActs[order] = routineActs[order - 1];
      routineActs[order - 1] = tmpRa;
      return { ...state };
    }),
  setReps: (day: number, order: number, reps: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      routineActs[order - 1].repsOrMeters = reps;
      return { ...state };
    }),
  setMeters: (day: number, order: number, meters: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      routineActs[order - 1].repsOrMeters = meters;
      return { ...state };
    }),
  setRatio: (day: number, order: number, ratio: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      routineActs[order - 1].ratioOrSecs = ratio;
      return { ...state };
    }),
  setSecs: (day: number, order: number, secs: number) =>
    set((state) => {
      const dayroutine = state.routines.find((r) => r.day === day);
      if (!dayroutine) return { ...state };
      const routineActs = dayroutine.routineActs;
      routineActs[order - 1].ratioOrSecs = secs;
      return { ...state };
    }),
}));

export default useProgramCreationStore;
