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
  registerUsername: async ({
    uid,
    username,
  }: RegisterUsernameParams): Promise<Username> => {
    if (!userList.find((user) => user.username === username)) {
      userTestApi.setUserinfo({ uid, newUserinfo: { username } });
      return { username };
    }
    return Promise.reject(statusInfo.fail.Conflict);
  },

  register: async (registerInfo: RegisterParams): Promise<Uid> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (!SigningState.uid) return reject(statusInfo.fail.Unauthorized);
        const newRec: RecDB = {
          id: recState.nextRid,
          author: SigningState.uid,
          date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          trainingType: registerInfo.trainingType,
          bodyWeight: registerInfo.bodyWeight,
          height: registerInfo.height,
          squat: registerInfo.squat,
          benchpress: registerInfo.benchpress,
          deadlift: registerInfo.deadlift,
        };
        recList.push(newRec);
        recState.nextRid += 1;
      }, 500);
    });
  },
};
export default registerTestApi;
