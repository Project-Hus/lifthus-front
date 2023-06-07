import { CreateActDto, QueryActDto } from "../dtos/program/act.dto";
import {
  CreateWeeklyProgramDto,
  QueryProgramDto,
  QueryWeeklyProgramDto,
} from "../dtos/program/program.dto";

// make commentapi interface function
export interface ProgramApi {
  queryActsByName: (name: string, skip?: number) => Promise<QueryActDto[]>;
  queryActById: (id: number) => Promise<QueryActDto>;
  createAct: (newAct: CreateActDto) => Promise<QueryActDto>;

  queryProgramBySlug: (slug: string) => Promise<QueryWeeklyProgramDto>;
  queryProgramsByTitle: (
    title: string,
    skip?: number
  ) => Promise<QueryProgramDto[]>;
  createWeeklyProgram: (newProgram: CreateWeeklyProgramDto) => Promise<number>;
}
