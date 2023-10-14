import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreateActDto, QueryActDto } from "./dtos/act.dto";
import { ActApi } from "./interfaces/actApi.interface";
import statusInfo from "./interfaces/statusInfo.json";

const actApi: ActApi = {
  createAct: async (act: CreateActDto): Promise<QueryActDto> => {
    const res = await axios.post(LIFTHUS_API_URL + "/routine/act", act, {
      withCredentials: true,
    });

    if (res.status !== statusInfo.succ.Created.code)
      throw Promise.reject("failed to create act");

    return res.data;
  },
  queryActsByName: async (name: string): Promise<QueryActDto[]> => {
    const res = await axios.get(
      LIFTHUS_API_URL + `/routine/acts?name=${name}`,
      {
        withCredentials: true,
      }
    );
    if (res.status !== statusInfo.succ.Ok.code)
      throw Promise.reject("failed to query act");
    return res.data;
  },
};

export default actApi;
