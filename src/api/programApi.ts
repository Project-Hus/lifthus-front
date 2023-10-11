import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreateProgramDto, QueryProgramDto } from "./dtos/program.dto";
import { ProgramApi } from "./interfaces/programApi.interface";

const programApi: ProgramApi = {
  createProgram: async (
    program: CreateProgramDto
  ): Promise<QueryProgramDto> => {
    switch (program.programType) {
      case "weekly":
        const res = await axios.post(
          LIFTHUS_API_URL + "/routine/program/weekly",
          {
            data: program,
            withCredentials: true,
          }
        );
        return res.data;
      default:
        return Promise.reject("Invalid program type");
    }
  },
};
export default programApi;
