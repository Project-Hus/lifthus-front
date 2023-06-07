import { create } from "zustand";
import { QueryActDto } from "../api/dtos/program/act.dto";
import {
  NewWeeklyRoutineAct,
  UpdateWeeklyProgram,
  UpdateWeeklyRoutineAct,
} from "./interfaces/createProgram.interface";

const useNewWeeklyProgramStore = create<NewWeeklyProgramStore>()((set) => ({
  newProgram: {
    title: undefined,
    author: undefined,
    image: undefined,
    description: undefined,
    tags: [],
    weekly_routines: [],
    daily_routines: [],
    routine_acts: [],
  },

  updateProgram: (newInfo) => {
    set((state) => ({
      ...state,
      newProgram: {
        ...state.newProgram,
        ...newInfo,
      },
    }));
  },

  // HANDLING TAG
  addTag: (tag) => {
    set((state) => ({
      ...state,
      newProgram: {
        ...state.newProgram,
        tags: [...state.newProgram.tags, tag],
      },
    }));
  },
  removeTag: (tag) => {
    set((state) => ({
      ...state,
      newProgram: {
        ...state.newProgram,
        tags: state.newProgram.tags.filter((t) => t !== tag),
      },
    }));
  },

  // HANDLING WEEKLY/DAILY ROUTINE
  addWeeklyRoutine: () => {
    set((state) => ({
      ...state,
      newProgram: {
        ...state.newProgram,
        weekly_routines: [
          ...state.newProgram.weekly_routines,
          { week: state.newProgram.weekly_routines.length + 1 },
        ],
      },
    }));
  },
  removeWeeklyRoutine: (week) => {
    set((state) => {
      // currently just popping
      week = state.newProgram.weekly_routines.length;
      return {
        ...state,
        newProgram: {
          ...state.newProgram,
          weekly_routines: state.newProgram.weekly_routines.filter(
            (r) => r.week !== week
          ),
          daily_routines: state.newProgram.daily_routines.filter(
            (r) => r.week !== week
          ),
          routine_acts: state.newProgram.routine_acts.filter(
            (r) => r.week !== week
          ),
        },
      };
    });
  },

  // HANDLING ROUTINE ACT
  addRoutineAct: (week, day, act) => {
    set((state) => {
      const newState = { ...state };
      // first, check if the week and day exist
      if (!state.newProgram.weekly_routines.find((r) => r.week === week))
        return state;
      if (
        !state.newProgram.daily_routines.find(
          (r) => r.week === week && r.day === day
        )
      )
        newState.newProgram.daily_routines.push({ week, day });
      // and get the acts set in the same day
      const sameDayActs = state.newProgram.routine_acts.filter(
        (r) => r.week === week && r.day === day
      );
      // and get the max order of the acts to attach new act to the end
      const maxOrder = sameDayActs.reduce((acc, cur) => {
        if (acc < cur.order) return cur.order;
        return acc;
      }, 0);
      // and push the new act
      newState.newProgram.routine_acts.push({
        week,
        day,
        act_id: act.id,
        type: act.type,
        reps: act.type === "rep" ? 0 : undefined,
        lap: act.type === "lap" ? 0 : undefined,
        w_ratio: act.type === "rep" ? 0.5 : undefined,
        order: maxOrder + 1,
        warmup: false,
      });
      return newState;
    });
  },
  removeRoutineAct: (week, day, order) => {
    set((state) => {
      const newState = { ...state };
      // get the act with the given identifiers
      const targetActIdx = state.newProgram.routine_acts.findIndex(
        (r) => r.week === week && r.day === day && r.order === order
      );
      if (targetActIdx === -1) return state;
      // update routine acts' order
      newState.newProgram.routine_acts = state.newProgram.routine_acts.map(
        (ra) => {
          if (ra.week === week && ra.day === day && ra.order > order) {
            return { ...ra, order: ra.order - 1 };
          }
          return ra;
        }
      );
      // remove the target act
      newState.newProgram.routine_acts.splice(targetActIdx, 1);
      return newState;
    });
  },
  updateRoutineAct: (week, day, order, ra: UpdateWeeklyRoutineAct) => {
    set((state) => {
      const prevRoutineActs = [...state.newProgram.routine_acts];
      const newRoutineActs = prevRoutineActs.map((r) => {
        if (r.week === week && r.day === day && r.order === order) {
          return { ...r, ...ra };
        }
        return { ...r };
      });

      return {
        ...state,
        newProgram: { ...state.newProgram, routine_acts: [...newRoutineActs] },
      };
    });
  },
  upRoutineAct: (week, day, order) => {
    set((state) => {
      const newRoutineActs = [...state.newProgram.routine_acts];
      const fromIdx = newRoutineActs.findIndex(
        (r) => r.week === week && r.day === day && r.order === order
      );
      const toIdx = newRoutineActs.findIndex(
        (r) => r.week === week && r.day === day && r.order === order - 1
      );
      if (fromIdx === -1 || toIdx === -1) return { ...state };
      newRoutineActs[fromIdx].order = order - 1;
      newRoutineActs[toIdx].order = order;
      const tmp = newRoutineActs[fromIdx];
      newRoutineActs[fromIdx] = newRoutineActs[toIdx];
      newRoutineActs[toIdx] = tmp;
      return {
        ...state,
        newProgram: {
          ...state.newProgram,
          routine_acts: [...newRoutineActs],
        },
      };
    });
  },
  downRoutineAct: (week, day, order) => {
    set((state) => {
      const newRoutineActs = [...state.newProgram.routine_acts];
      const fromIdx = newRoutineActs.findIndex(
        (r) => r.week === week && r.day === day && r.order === order
      );
      const toIdx = newRoutineActs.findIndex(
        (r) => r.week === week && r.day === day && r.order === order + 1
      );
      if (fromIdx === -1 || toIdx === -1) return { ...state };
      newRoutineActs[fromIdx].order = order + 1;
      newRoutineActs[toIdx].order = order;
      const tmp = newRoutineActs[fromIdx];
      newRoutineActs[fromIdx] = newRoutineActs[toIdx];
      newRoutineActs[toIdx] = tmp;
      return {
        ...state,
        newProgram: {
          ...state.newProgram,
          routine_acts: [...newRoutineActs],
        },
      };
    });
  },
}));

export interface NewWeeklyProgramStore {
  newProgram: {
    title?: string;
    author?: number;
    image?: string;
    description?: string;
    tags: string[];
    weekly_routines: WeeklyRoutine[];
    daily_routines: WeeklyDailyRoutine[];
    routine_acts: WeeklyRoutineAct[];
  };

  updateProgram(newInfo: UpdateWeeklyProgram): void;
  addTag(tag: string): void;
  removeTag(tag: string): void;

  addWeeklyRoutine(): void;
  removeWeeklyRoutine(week: number): void;

  addRoutineAct(week: number, day: number, act: QueryActDto): void;
  removeRoutineAct(week: number, day: number, order: number): void;
  updateRoutineAct(
    week: number,
    day: number,
    order: number,
    ra: UpdateWeeklyRoutineAct
  ): void;
  upRoutineAct(week: number, day: number, order: number): void;
  downRoutineAct(week: number, day: number, order: number): void;
}

export type WeeklyRoutine = {
  week: number;
};

export type WeeklyDailyRoutine = {
  week: number;
  day: number;
};

export type WeeklyRoutineAct = {
  week: number;
  day: number;

  act_id: number;
  type: string;
  order: number;

  w_ratio?: number;
  reps?: number;
  lap?: number;
  warmup: boolean;
};

export default useNewWeeklyProgramStore;
