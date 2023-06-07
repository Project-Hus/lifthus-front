import axios from "axios";
import { LIFTHUS_API_URL } from "../../common/routes";
import { CreateActDto } from "../dtos/program/act.dto";
import { CreateWeeklyProgramDto } from "../dtos/program/program.dto";
import { ProgramApi } from "../interfaces/programApi.interface";

const programTestApi: ProgramApi = {
  createWeeklyProgram: async (newProgram: CreateWeeklyProgramDto) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(
      LIFTHUS_API_URL + "/routine/program/weekly",
      newProgram,
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
  queryActsByName: async (name: string, skip?: number) => {
    const res = await axios.get(LIFTHUS_API_URL + "/routine/act", {
      params: {
        name: name,
        skip: skip || 0,
      },
    });
    return res.data;
  },
  createAct: async (newAct: CreateActDto) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(LIFTHUS_API_URL + "/routine/act", newAct, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  queryActById: async (id) => {
    const res = await axios.get(LIFTHUS_API_URL + "/routine/act", {
      params: {
        id: id,
      },
    });
    return res.data;
  },
};

export default programTestApi;
