import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { QueryPostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Post from "./Post";

interface UsersPostsProps {
  uids: number[];
}
const UsersPosts = ({ uids }: UsersPostsProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "followings"],
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

  /* Infinite scroll */
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.map((post) => (
            <Post key={post.id} post={post} />
          ))}
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
