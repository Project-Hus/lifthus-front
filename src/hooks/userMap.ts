import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { UserDto } from "../api/dtos/user.dto";
import userApi from "../api/userApi";

const useUserMap = (
  queryKey: any[],
  uids: Set<string>,
  enabled: boolean = true
) => {
  const uidList = Array.from(uids);

  const { data: users } = useQuery<(UserDto | null)[]>({
    queryKey,
    queryFn: async () => {
      return await userApi.getUsers(uidList);
    },
    enabled,
  });
  const userMapRef = useRef(new Map<string, UserDto>());
  const userMap = userMapRef.current;
  users?.forEach((user) => {
    if (user) userMap.set(String(user.uid), user);
  });
  return { users: userMap };
};

export default useUserMap;
