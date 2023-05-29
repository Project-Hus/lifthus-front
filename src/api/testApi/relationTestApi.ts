import axios from "axios";
import { LIFTHUS_AUTH_URL } from "../../common/routes";
import { RelationApi } from "../interfaces/relationApi.interface";

const relationTestApi: RelationApi = {
  getUserFollowing: async ({ uid }: { uid: number }): Promise<number[]> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/relation/following/" + uid,
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
  getUserFollowers: async ({ uid }: { uid: number }): Promise<number[]> => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.get(
      LIFTHUS_AUTH_URL + "/auth/relation/followers/" + uid,
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
  followUser: async ({ uid }: { uid: number }) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.post(
      LIFTHUS_AUTH_URL + "/auth/relation/follow/" + uid,
      {},
      { withCredentials: true, headers: { Authorization: lst } }
    );
    return res.data;
  },
  unfollowUser: async ({ uid }: { uid: number }) => {
    const lst = localStorage.getItem("lifthus_st");
    const res = await axios.delete(
      LIFTHUS_AUTH_URL + "/auth/relation/unfollow/" + uid,
      {
        withCredentials: true,
        headers: {
          Authorization: lst,
        },
      }
    );
    return res.data;
  },
};

export default relationTestApi;
