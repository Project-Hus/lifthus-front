import { Text } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { useVisibleEffect } from "../../hooks/visibleEffect";
import Post from "./Post";

// 쿼리 로딩 => 온석세스 셋포스트 인밸리드 => 또 쿼리

const AllPosts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
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
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.map((post) => (
            <Post pid={post.id} />
          ))}
        </React.Fragment>
      ))}
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
