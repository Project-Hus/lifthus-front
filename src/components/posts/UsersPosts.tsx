import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { QueryPostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Post from "./Post";

interface UsersPostsProps {
  uids: number[];
}
const UsersPosts = ({ uids }: UsersPostsProps) => {
  const [posts, setPosts] = useState<QueryPostDto[]>([]);
  const [skip, setSkip] = useState(0);
  const [seen, setSeen] = useState(true);

  const { isLoading } = useQuery({
    queryKey: ["posts", "followings"],
    queryFn: async () => {
      const posts = await postApi.getUsersPosts({
        users: uids,
        skip,
      });
      setPosts((prev) => [...prev, ...posts]);
      setSkip((prev) => prev + posts.length);
      setSeen(false);
      return posts;
    },
    enabled: seen,
  });
  const queryClient = useQueryClient();

  const postList = posts.map((post) => <Post key={post.id} post={post} />);

  /* Infinite scroll */
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          queryClient.invalidateQueries(["posts"]);
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
      {postList}
      {isLoading ? (
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
