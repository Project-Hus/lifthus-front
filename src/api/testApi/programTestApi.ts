import axios from "axios";
import { LIFTHUS_API_URL } from "../../common/routes";
import { CreateActDto } from "../dtos/program/act.dto";
import { ProgramApi } from "../interfaces/programApi.interface";

const programTestApi: ProgramApi = {
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
    const lst = localStorage.getItem("lifthus_store");
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
