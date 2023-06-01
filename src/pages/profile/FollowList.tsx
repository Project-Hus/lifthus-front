import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import relationApi from "../../api/relationApi";
import userApi from "../../api/userApi";
import ErrorPage from "../ErrorPage";
import { ThemeColor } from "../../common/styles/theme.style";
import UserList from "../../components/profile/FollowList/UserList";

const FollowList = ({ type }: { type: "following" | "followers" }) => {
  const username = useParams().username;
  const navigate = useNavigate();

  // user
  const { data: user } = useQuery({
    queryKey: ["user", { username }],
    queryFn: () =>
      username !== undefined
        ? userApi.getUserInfoByUsername({ username })
        : Promise.reject(new Error("undefined")),
    enabled: !!username,
  });

  const uid = user?.uid;

  // user following
  const { data: userFollowing } = useQuery({
    queryKey: ["following", { uid: uid }],
    queryFn: () =>
      uid !== undefined
        ? relationApi.getUserFollowing({ uid })
        : Promise.reject(new Error("undefined")),
    enabled: !!uid,
  });

  // user followers
  const { data: userFollowers } = useQuery({
    queryKey: ["followers", { uid: uid }],
    queryFn: () =>
      uid !== undefined
        ? relationApi.getUserFollowers({ uid })
        : Promise.reject(new Error("undefined")),
    enabled: !!uid,
  });

  if (!user) return <ErrorPage />;
  return (
    <>
      <Tabs
        size="lg"
        bgColor={ThemeColor.backgroundColorDarker}
        variant="unstyled"
        align="end"
        index={type === "following" ? 0 : 1}
      >
        <TabList>
          <Tab
            w="50%"
            _hover={{ bgColor: ThemeColor.basicColorHover }}
            _selected={{
              color: "white",
              bg: ThemeColor.basicColor,
            }}
            onClick={() => navigate(`/profile/${username}/following`)}
          >
            {userFollowing ? userFollowing.length : 0} Following
          </Tab>
          <Tab
            w="50%"
            _hover={{ bgColor: ThemeColor.basicColorHover }}
            _selected={{ color: "white", bg: ThemeColor.basicColor }}
            onClick={() => navigate(`/profile/${username}/followers`)}
          >
            {userFollowers ? userFollowers.length : 0} Followers
          </Tab>
        </TabList>
      </Tabs>
      {type === "following" && userFollowing && (
        <UserList users={userFollowing} />
      )}
      {type === "followers" && userFollowers && (
        <UserList users={userFollowers} />
      )}
    </>
  );
};

export default FollowList;
