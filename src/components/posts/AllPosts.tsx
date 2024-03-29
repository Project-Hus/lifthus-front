import { Text } from "@chakra-ui/react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import useUserMap from "../../hooks/userMap";
import { useVisibleEffect } from "../../hooks/visibleEffect";
import Post2 from "./post/Post";

const AllPosts = () => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, isFetching, isSuccess } = useInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: async ({ pageParam = 0 }) => {
      return await postApi.getAllPosts(pageParam);
    },
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, curr) => acc + curr.length, 0),
  });

  const pages = data?.pages || [];

  const uidSet = new Set(
    pages.map((page) => page.map((post) => post.author)).flat()
  );

  const { users: authorMap } = useUserMap(
    ["posts", "all", "authors", ...Array.from(uidSet)],
    uidSet,
    !!data
  );

  /* Infinite scroll */
  const { observerTarget } = useVisibleEffect(fetchNextPage);

  return (
    <>
      {isSuccess &&
        pages.map((page, i) => {
          return (
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
          );
        })}
      {isFetching ? (
        <div style={{ textAlign: "center", padding: "1em" }}>
          <BlueSpinner />
        </div>
      ) : (
        <>
          <Text align="center" fontSize="4xl">
            😲
          </Text>
        </>
      )}
      {<div ref={observerTarget} />}
    </>
  );
};

export default AllPosts;
