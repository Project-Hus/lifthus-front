import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserDto } from "../api/dtos/user.dto";
import userApi from "../api/userApi";

const useUserMap = (
  queryKey: any[],
  uids: Set<string>,
  enabled?: boolean | undefined
) => {
  const uidList = Array.from(uids);

  const { data: users } = useQuery<(UserDto | null)[]>({
    queryKey,
    queryFn: async () => {
      return await userApi.getUsers(uidList);
    },
    enabled,
  });

  const userMap = new Map<string, UserDto>();
  users?.forEach((user) => {
    if (user) userMap.set(String(user.uid), user);
  });

  return { users: userMap };
};

export default useUserMap;
