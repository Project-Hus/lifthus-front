import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import relationApi from "../../api/relationApi";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import AllPosts from "../../components/posts/AllPosts";

import CreatePost from "../../components/posts/CreatePost";
import CreatePostV2 from "../../components/posts/CreatePostV2";
import UsersPosts from "../../components/posts/UsersPosts";
import useUserStore from "../../store/user.zustand";

const Home = () => {
  const { uid } = useUserStore();

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
  return (
    <>
      <Tabs isFitted variant="enclosed" defaultIndex={!!uid ? 1 : 0} size="lg">
        <TabList>
          <Tab
            transition="0.3s"
            onClick={async () => {
              queryClient.invalidateQueries(["posts", "all"]);
            }}
          >
            All posts
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
            Followings' posts
          </Tab>
        </TabList>
        {!!uid && <CreatePostV2 />}
        <TabPanels>
          <TabPanel>
            <AllPosts />
          </TabPanel>
          <TabPanel>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "1em" }}>
                <BlueSpinner />
              </div>
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
