import { Text } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import useUserMap from "../../hooks/userMap";
import { useVisibleEffect } from "../../hooks/visibleEffect";

import Post2 from "./post/Post";

interface UsersPostsProps {
  uids: string[];
}
const UsersPosts = ({ uids }: UsersPostsProps) => {
  const { data, fetchNextPage, isFetching, isSuccess } = useInfiniteQuery({
    queryKey: ["posts", "users", uids],
    queryFn: async ({ pageParam = 0 }) => {
      const posts = await postApi.getUsersPosts({
        users: uids,
        skip: pageParam,
      });
      return posts;
    },
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, curr) => acc + curr.length, 0),
  });

  const uidSet = new Set(uids);

  const { users: authorMap } = useUserMap(
    ["posts", "users", uids, "authors"],
    uidSet
  );

  /* Infinite scroll */
  const { observerTarget } = useVisibleEffect(fetchNextPage);

  return (
    <>
      {isSuccess &&
        data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((post) => {
              return (
                <Post2
                  key={post.id}
                  post={post}
                  author={authorMap.get(post.author)}
                />
              );
            })}
          </React.Fragment>
        ))}
      {isFetching ? (
        <div style={{ textAlign: "center", padding: "1em" }}>
          <BlueSpinner />
        </div>
      ) : (
        <Text align="center" fontSize="4xl">
          😲
        </Text>
      )}
      <div ref={observerTarget} />
    </>
  );
};

export default UsersPosts;
