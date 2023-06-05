import { create } from "zustand";
import { programDB } from "./interfaces/program.interface";
//make interface for useRoutineStore
interface routineDB {
  programList: programDB[];
}
