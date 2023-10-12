import { create } from "zustand";
import {
  CreateDailyRoutineDto,
  CreateProgramDto,
} from "../api/dtos/program.dto";
import { RegisterNumberType } from "./interfaces/register.interface";

interface CreateProgramState {
  programType: "none" | "weekly" | "daily";
  title: string;
  author: string;
  derivedFrom?: string | undefined;
  imageSrcs: string[];
  text: string;
  dailyRoutines: CreateDailyRoutineDto[];
  setType: (type: "none" | "weekly" | "daily") => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setDerivedFrom: (derivedFrom: string) => void;
  setImageSrcs: (imageSrcs: string[]) => void;
  setText: (text: string) => void;
  addDailyRoutine: (dailyRoutine: CreateDailyRoutineDto) => void;
  removeDailyRoutine: (day: number) => void;
  replaceDailyRoutine: (dailyRoutine: CreateDailyRoutineDto) => void;
}

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
  addDailyRoutine: (dailyRoutine: CreateDailyRoutineDto) =>
    set((state) => {
      const prev = state.dailyRoutines;
      if (prev.find((dr) => dr.day === dailyRoutine.day))
        throw new Error("day already exists");
      const cur = [...prev, dailyRoutine];
      cur.sort((a, b) => a.day - b.day);
      return { ...state, dailyRoutines: cur };
    }),
  removeDailyRoutine: (day: number) =>
    set((state) => {
      const prev = state.dailyRoutines;
      const cur = prev.filter((dr) => dr.day !== day);
      return { ...state, dailyRoutines: cur };
    }),
  replaceDailyRoutine: (dailyRoutine: CreateDailyRoutineDto) =>
    set((state) => {
      const prev = state.dailyRoutines;
      const idx = prev.findIndex((dr) => dr.day === dailyRoutine.day);
      if (idx === -1) throw new Error("day does not exist");
      const cur = [...prev];
      cur[idx] = dailyRoutine;
      return { ...state, dailyRoutines: cur };
    }),
}));

export default useProgramCreationStore;
