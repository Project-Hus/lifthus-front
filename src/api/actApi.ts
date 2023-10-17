import axios from "axios";
import { LIFTHUS_API_URL } from "../common/routes";
import { CreateActDto, QueryActDto } from "./dtos/act.dto";
import { ActApi } from "./interfaces/actApi.interface";
import statusInfo from "./interfaces/statusInfo.json";

const tmpActCache: { [key: string]: QueryActDto } = {};

const actApi: ActApi = {
  createAct: async (act: CreateActDto): Promise<QueryActDto> => {
    const res = await axios.post(LIFTHUS_API_URL + "/routine/act", act, {
      withCredentials: true,
    });

    if (res.status !== statusInfo.succ.Created.code)
      throw Promise.reject("failed to create act");

    return res.data;
  },
  queryActByCode: async (code: string): Promise<QueryActDto> => {
    if (tmpActCache[code]) return tmpActCache[code];
    const res = await axios.get<QueryActDto>(
      LIFTHUS_API_URL + `/routine/act?code=${code}`,
      {
        withCredentials: true,
      }
    );
    if (res.status !== statusInfo.succ.Ok.code)
      throw Promise.reject("failed to query act");
    tmpActCache[code] = res.data;
    return res.data;
  },
  queryActsByName: async (name: string): Promise<QueryActDto[]> => {
    try {
      const res = await axios.get<QueryActDto[]>(
        LIFTHUS_API_URL + `/routine/acts?name=${name}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== statusInfo.succ.Ok.code)
        throw Promise.reject("failed to query act");
      for (const act of res.data) {
        tmpActCache[act.code] = act;
      }
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default actApi;
