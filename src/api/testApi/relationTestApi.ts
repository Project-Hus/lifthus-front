import axios from "axios";
import { RelationApi } from "../interfaces/relationApi.interface";

const relationTestApi: RelationApi = {
  getUserFollowing: async ({ uid }: { uid: number }): Promise<number[]> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get("/auth/relation/following/" + uid, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  getUserFollowers: async ({ uid }: { uid: number }): Promise<number[]> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get("/auth/relation/followers/" + uid, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
  followUser: async ({ uid }: { uid: number }) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(
      "/auth/relation/follow/" + uid,
      {},
      { withCredentials: true, headers: { Authorization: lst } }
    );
    return res.data;
  },
  unfollowUser: async ({ uid }: { uid: number }) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.delete("/auth/relation/unfollow/" + uid, {
      withCredentials: true,
      headers: {
        Authorization: lst,
      },
    });
    return res.data;
  },
};

export default relationTestApi;
