import { CreateActDto, QueryActDto } from "../dtos/act.dto";

export interface ActApi {
  createAct(act: CreateActDto): Promise<QueryActDto>;
  queryActsByName(name: string): Promise<QueryActDto[]>;
  queryActByCode(code: string): Promise<QueryActDto>;
}
