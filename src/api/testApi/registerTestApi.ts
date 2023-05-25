import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../../common/routes";
import { GetUserInfoDto } from "../dtos/user.dto";
import {
  RegisterApi,
  RegisterUsernameParams,
  RegisterParams,
} from "../interfaces/registerApi.interface";
import statusInfo from "../interfaces/statusInfo.json";
import { Uid, Username } from "../interfaces/userApi.interface";
import { RecDB, recList, recState } from "../mocks/recApi.mock";
import { SigningState } from "../mocks/state.mcok";
import userList from "../mocks/userTestApi.mock";
import userTestApi from "./userTestApi";

const registerTestApi: RegisterApi = {
  registerUsername: async (
    regiName: RegisterUsernameParams
  ): Promise<GetUserInfoDto> => {
    try {
      const lst = localStorage.getItem("lifthus_st");
      if (!lst) return Promise.reject(statusInfo.fail.Unauthorized);
      const res = await axios.put(LIFTHUS_AUTH_URL + "/auth/user", regiName, {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },

  register: async (registerInfo: RegisterParams): Promise<RegisterParams> => {
    try {
      const lst = localStorage.getItem("lifthus_st");
      if (!lst) return Promise.reject(statusInfo.fail.Unauthorized);
      const res = await axios.post(
        LIFTHUS_AUTH_URL + "/auth/user",
        registerInfo,
        {
          withCredentials: true,
          headers: {
            Authorization: lst,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
};
export default registerTestApi;
