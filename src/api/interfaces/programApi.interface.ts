import { CreateActDto, QueryActDto } from "../dtos/program/act.dto";

// make commentapi interface function
export interface ProgramApi {
  queryActsByName: (name: string, skip?: number) => Promise<QueryActDto[]>;
  createAct: (newAct: CreateActDto) => Promise<QueryActDto>;
}
