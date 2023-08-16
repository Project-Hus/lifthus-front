import { Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { QueryPostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import relationApi from "../../api/relationApi";
import BasicPageLayout, {
  BasicPageLayoutNoMargin,
} from "../../common/components/layouts/BasicPageLayout";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import AllPosts from "../../components/AllPosts";

import Posts from "../../components/AllPosts";
import CreatePost from "../../components/posts/CreatePost";
import UsersPosts from "../../components/UsersPosts";
import useUserStore from "../../store/user.zustand";

const Home = () => {
  const { uid } = useUserStore();
  const pathname = window.location.pathname;
  const folOrNot = pathname.startsWith("/followings");

  const { data: followings, isLoading } = useQuery<number[]>({
    queryKey: ["followings", { uid }],
    queryFn: async () => {
      if (uid) return await relationApi.getUserFollowing({ uid });
      return [];
    },
  });
  followings !== undefined && followings.push(uid);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  if (isLoading)
    return (
      <BasicPageLayout>
        <Flex justifyContent="center" alignItems="center">
          <BlueSpinner />
        </Flex>
      </BasicPageLayout>
    );
  return (
    <BasicPageLayoutNoMargin>
      <Tabs isFitted variant="enclosed" index={folOrNot ? 1 : 0} size="lg">
        <TabList borderBlockEnd={"none"}>
          <Tab
            transition="0.3s"
            borderBlockEnd={!folOrNot ? "none" : "solid 1px"}
            onClick={async () => {
              queryClient.invalidateQueries(["posts", "all"]);
              navigate("/");
            }}
          >
            All posts
          </Tab>
          <Tab
            transition="0.3s"
            borderBlockEnd={!folOrNot ? "solid 1px" : "none"}
            onClick={async () => {
              if (!uid) {
                navigate("/sign");
                return;
              }
              queryClient.invalidateQueries(["posts", "followings"]);
              navigate("/followings");
            }}
          >
            Followings' posts
          </Tab>
        </TabList>
      </Tabs>
      {!!uid && <CreatePost />}
      {!folOrNot && <AllPosts />}
      {folOrNot && <UsersPosts uids={followings || []} />}
    </BasicPageLayoutNoMargin>
  );
};

export default Home;
