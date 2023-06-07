import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { ProgramApi } from "./interfaces/programApi.interface";
import programTestApi from "./testApi/programTestApi";

const programApi: ProgramApi = {
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
