import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreateWeeklyProgramDto } from "./dtos/program/program.dto";
import { ProgramApi } from "./interfaces/programApi.interface";
import programTestApi from "./testApi/programTestApi";

const programApi: ProgramApi = {
  queryProgramBySlug: async (slug: string) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.queryProgramBySlug(slug);
    }
    const res = await axios.get(LIFTHUS_API_URL + "/routine/program/" + slug);
    return res.data;
  },
  queryProgramsByTitle: async (title: string, skip?: number) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.queryProgramsByTitle(title, skip);
    }
    const res = await axios.get(LIFTHUS_API_URL + "/routine/program", {
      params: {
        title: title,
        skip: skip || 0,
      },
    });
    return res.data;
  },
  createWeeklyProgram: async (newProgram: CreateWeeklyProgramDto) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.createWeeklyProgram(newProgram);
    }
    const res = await axios.post(
      LIFTHUS_API_URL + "/routine/program/weekly",
      newProgram,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  queryActsByName: async (name: string, skip?: number) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.queryActsByName(name, skip);
    }
    const res = await axios.get(LIFTHUS_API_URL + "/routine/act", {
      params: {
        name: name,
        skip: skip || 0,
      },
    });
    return res.data;
  },
  createAct: async (newAct) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.createAct(newAct);
    }
    const res = await axios.post(LIFTHUS_API_URL + "/routine/act", newAct, {
      withCredentials: true,
    });
    return res.data;
  },
  queryActById: async (id) => {
    if (process.env.NODE_ENV == "development") {
      return programTestApi.queryActById(id);
    }
    const res = await axios.get(LIFTHUS_API_URL + "/routine/act", {
      params: {
        id: id,
      },
    });
    return res.data;
  },
};

export default programApi;
