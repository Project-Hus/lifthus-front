import { Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { QueryPostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Post from "./Post";

type PostsProps = {
  posts: QueryPostDto[];
  onScrollEnd: () => void;
};

const Posts = ({ posts, onScrollEnd }: PostsProps) => {
  const postList = posts.map((post) => <Post key={post.id} post={post} />);

  /* Infinite scroll */
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onScrollEnd();
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
      <Text align="center" fontSize="4xl">
        😲
      </Text>
      <div ref={observerTarget} />
    </>
  );
};

export default Posts;
