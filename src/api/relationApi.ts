import axios from "axios";
import { RelationApi } from "./interfaces/relationApi.interface";
import relationTestApi from "./testApi/relationTestApi";

const relationApi: RelationApi = {
  getUserFollowing: async ({ uid }: { uid: number }): Promise<number[]> => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.getUserFollowing({ uid });
    }
    const res = await axios.get("/auth/relation/following/" + uid, {
      withCredentials: true,
    });
    return res.data;
  },
  getUserFollowers: async ({ uid }: { uid: number }): Promise<number[]> => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.getUserFollowers({ uid });
    }
    const res = await axios.get("/auth/relation/followers/" + uid, {
      withCredentials: true,
    });
    return res.data;
  },
  followUser: async ({ uid }: { uid: number }) => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.followUser({ uid });
    }
    const res = await axios.post(
      "/auth/relation/follow/" + uid,
      {},
      { withCredentials: true }
    );
    return res.data;
  },
  unfollowUser: async ({ uid }: { uid: number }) => {
    if (process.env.NODE_ENV === "development") {
      return relationTestApi.unfollowUser({ uid });
    }
    const res = await axios.delete("/auth/relation/unfollow/" + uid, {
      withCredentials: true,
    });
    return res.data;
  },
};

export default relationApi;
