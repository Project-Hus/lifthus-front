import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../common/routes";
import { RelationApi } from "./interfaces/relationApi.interface";
import relationTestApi from "./testApi/relationTestApi";

const relationApi: RelationApi = {
  getUserFollowing: async ({ uid }: { uid: number }): Promise<number[]> => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.getUserFollowing({ uid });
    }
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/relation/following/" + uid,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  getUserFollowers: async ({ uid }: { uid: number }): Promise<number[]> => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.getUserFollowers({ uid });
    }
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/relation/followers/" + uid,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
  followUser: async ({ uid }: { uid: number }) => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.followUser({ uid });
    }
    const res = await axios.post(
      LIFTHUS_AUTH_URL + "/auth/relation/follow/" + uid,
      {},
      { withCredentials: true }
    );
    return res.data;
  },
  unfollowUser: async ({ uid }: { uid: number }) => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.unfollowUser({ uid });
    }
    const res = await axios.delete(
      LIFTHUS_AUTH_URL + "/auth/relation/unfollow/" + uid,
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};

export default relationApi;
