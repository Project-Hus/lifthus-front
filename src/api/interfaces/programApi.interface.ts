import { CreateProgramDto, QueryProgramDto } from "../dtos/program.dto";

export interface ProgramApi {
  createProgram: (program: CreateProgramDto) => Promise<QueryProgramDto>;
}
