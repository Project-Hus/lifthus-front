import { CreateActDto, QueryActDto } from "../dtos/program/act.dto";
import { CreateWeeklyProgramDto } from "../dtos/program/program.dto";

// make commentapi interface function
export interface ProgramApi {
  queryActsByName: (name: string, skip?: number) => Promise<QueryActDto[]>;
  queryActById: (id: number) => Promise<QueryActDto>;
  createAct: (newAct: CreateActDto) => Promise<QueryActDto>;

  createWeeklyProgram: (newProgram: CreateWeeklyProgramDto) => Promise<number>;
}
