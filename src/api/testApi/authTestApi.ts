import axios from "axios";
import { HUS_AUTH_URL, LIFTHUS_AUTH_URL } from "../../common/routes";
import { AuthApi, SessionResponse } from "../interfaces/authApi.interface";
import statusInfo from "../interfaces/statusInfo.json";

const authTestApi: AuthApi = {
  updateSession: async (): Promise<SessionResponse> => {
    try {
      let res = await axios.get(LIFTHUS_AUTH_URL + "/auth/session", {
        withCredentials: true,
      });
    } catch (err) {}
    return {};
  },
  getSID: async (): Promise<string> => {
    return "";
  },
  signOut: async (): Promise<void> => {
    return;
  },
};
export default authTestApi;
