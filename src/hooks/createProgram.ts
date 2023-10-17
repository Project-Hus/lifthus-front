import { useCallback } from "react";
import {
  CreateProgramDto,
  CreateRoutineActDto,
  CreateRoutineDto,
} from "../api/dtos/program.dto";
import useProgramCreationStore from "../store/createProgram.zustand";
import useUserStore from "../store/user.zustand";

const useProgramCreationFeats = () => {
  const cps = useProgramCreationStore();
  const { uid } = useUserStore();
  const cpdto: CreateProgramDto = {
    programType: cps.programType,
    title: cps.title,
    author: uid,
    parentProgram: cps.parentProgramCode,
    parentVersion: cps.parentVersion,
    imageSrcs: cps.imageSrcs,
    text: cps.text,
    routines: cps.routines.map((r) => {
      const radtos = r.routineActs.map((ra, idx) => {
        const radto: CreateRoutineActDto = {
          order: idx + 1,
          actCode: ra.actCode,
          stage: ra.stage,
          repsOrMeters: ra.repsOrMeters,
          ratioOrSecs: ra.ratioOrSecs,
        };
        return radto;
      });
      radtos.sort((a, b) => a.order - b.order);
      const rdto: CreateRoutineDto = {
        day: r.day,
        routineActs: radtos,
      };
      return rdto;
    }),
  };
  cpdto.routines.sort((a, b) => a.day - b.day);
  const isProgramValid = useCallback(() => {
    if (cps.programType === "none") return false;
    if (cps.title === "") return false;
    if (cps.text === "") return false;
    if (cps.routines.length === 0) return false;
    for (const r of cps.routines) {
      if (r.routineActs.length === 0) return false;
      for (const ra of r.routineActs) {
        if (ra.actCode === "") return false;
      }
    }
    return true;
  }, [cps]);
  return { dto: cpdto, isProgramValid };
};

export default useProgramCreationFeats;
