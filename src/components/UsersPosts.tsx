import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { QueryPostDto } from "../api/dtos/post.dto";
import postApi from "../api/postApi";
import BlueSpinner from "../common/components/spinners/BlueSpinner";
import Post from "./posts/Post";

interface UsersPostsProps {
  uids: number[];
}
const UsersPosts = ({ uids }: UsersPostsProps) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);

  const { data: posts, isLoading } = useQuery<QueryPostDto[]>({
    queryKey: ["posts", { uids }],
    queryFn: async () => {
      return await postApi.getUsersPosts({
        users: uids,
        skip,
      });
    },
  });
  const usersPosts = posts || [];
  const postList = usersPosts.map((post) => <Post key={post.id} post={post} />);
  return (
    <>
      <PostBoard>
        {isLoading ? (
          <BlueSpinner />
        ) : postList ? (
          postList
        ) : (
          <Text align="center" fontSize="4xl">
            N😲NE
          </Text>
        )}
      </PostBoard>
    </>
  );
};

const PostBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default UsersPosts;
