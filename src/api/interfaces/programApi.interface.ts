import { CreateProgramDto, QueryProgramDto } from "../dtos/program.dto";

export interface ProgramApi {
  queryProgramByCode: (code: string) => Promise<QueryProgramDto>;
  queryProgramsByTitle: (title: string) => Promise<QueryProgramDto[]>;
  createProgram: (program: CreateProgramDto) => Promise<QueryProgramDto>;
}
