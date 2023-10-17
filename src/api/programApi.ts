import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreateProgramDto, QueryProgramDto } from "./dtos/program.dto";
import { ProgramApi } from "./interfaces/programApi.interface";
import statusInfo from "./interfaces/statusInfo.json";

const programApi: ProgramApi = {
  queryProgramByCode: async (code: string): Promise<QueryProgramDto> => {
    const res = await axios.get<QueryProgramDto>(
      LIFTHUS_API_URL + "/routine/program/" + code
    );
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject();
    return res.data;
  },
  queryProgramsByTitle: async (title: string): Promise<QueryProgramDto[]> => {
    const res = await axios.get<QueryProgramDto[]>(
      LIFTHUS_API_URL + `/routine/programs?title=${title}`
    );
    if (res.status !== statusInfo.succ.Ok.code) return Promise.reject();
    return res.data;
  },
  createProgram: async (
    program: CreateProgramDto
  ): Promise<QueryProgramDto> => {
    let res;
    switch (program.programType) {
      case "weekly":
        console.log(program);
        res = await axios.post(
          LIFTHUS_API_URL + "/routine/program/weekly",
          program,
          {
            withCredentials: true,
          }
        );
        break;
      default:
        return Promise.reject("Invalid program type");
    }
    if (res.status !== statusInfo.succ.Created.code) return Promise.reject();
    return res.data;
  },
};
export default programApi;
