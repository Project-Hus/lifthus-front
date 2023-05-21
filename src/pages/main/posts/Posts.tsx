import styled from "@emotion/styled";
import React from "react";
import { QueryPostDto } from "../../../api/dtos/post.dto";
import Post from "./components/Post";

interface PostsProps {
  posts: QueryPostDto[];
}
const Posts = ({ posts }: PostsProps) => {
  const postList = [];
  for (const post of posts) {
    postList.push(<Post key={post.id} post={post} />);
  }
  return <PostBoard>{postList}</PostBoard>;
};

const PostBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Posts;
