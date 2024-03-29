import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import relationApi from "../../api/relationApi";

import BlueSpinnerCentered from "../../common/components/spinners/BlueSpinnerCentered";
import AllPosts from "../../components/posts/AllPosts";

import CreatePost from "../../components/posts/CreatePost";
import UsersPosts from "../../components/posts/UsersPosts";
import useUserStore from "../../store/user.zustand";

const Home = () => {
  const { uid } = useUserStore();

  const { data: followings, isLoading } = useQuery<string[]>({
    queryKey: ["followings", { uid }],
    queryFn: async () => {
      if (uid) return await relationApi.getUserFollowing({ uid });
      return [];
    },
  });
  followings !== undefined && followings.push(uid);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <>
      <Tabs isFitted variant="line" defaultIndex={!!uid ? 1 : 0} size="xl">
        <TabList>
          <Tab
            transition="0.3s"
            onClick={async () => {
              queryClient.invalidateQueries(["posts", "all"]);
            }}
          >
            <b>All</b>
          </Tab>
          <Tab
            transition="0.3s"
            onClick={async () => {
              if (!uid) {
                navigate("/sign");
                return;
              }
              queryClient.invalidateQueries(["posts", "followings"]);
            }}
          >
            <b>Followings</b>
          </Tab>
        </TabList>
        {!!uid && <CreatePost />}
        <TabPanels padding={0}>
          <TabPanel padding={0}>
            <AllPosts />
          </TabPanel>
          <TabPanel padding={0}>
            {isLoading ? (
              <BlueSpinnerCentered />
            ) : (
              !!uid && <UsersPosts uids={followings || []} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Home;
