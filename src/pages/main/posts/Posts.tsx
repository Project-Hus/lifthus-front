import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { QueryPostDto } from "../../../api/dtos/post.dto";
import Post from "./components/Post";

interface PostsProps {
  posts: QueryPostDto[];
}
const Posts = ({ posts }: PostsProps) => {
  const postList = posts.map((post) => <Post key={post.id} post={post} />);
  return (
    <PostBoard>
      {postList.length ? (
        postList
      ) : (
        <Text align="center" fontSize="4xl">
          😲
        </Text>
      )}
    </PostBoard>
  );
};

const PostBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Posts;
