import { Text } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { useVisibleEffect } from "../../hooks/visibleEffect";
import Post from "./post/Post";
import Post2 from "./post/Post2";

const AllPosts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: async ({ pageParam = 0 }) => {
      return await postApi.getAllPosts(pageParam);
    },
    getNextPageParam: (lastPage, pages) =>
      pages.reduce((acc, curr) => acc + curr.length, 0),
  });

  /* Infinite scroll */
  const { observerTarget } = useVisibleEffect(fetchNextPage);

  return (
    <>
      {isSuccess &&
        data?.pages.map((page, i) => {
          return (
            <React.Fragment key={i}>
              {page.map((post) => (
                <Post2 postSumm={post} />
              ))}
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
