import { Avatar } from "@chakra-ui/avatar";
import { Card, CardHeader } from "@chakra-ui/card";
import { Img } from "@chakra-ui/image";
import {
  Text,
  Link as LinkChakra,
  Stack,
  Heading,
  Box,
} from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { Uid } from "../../../../api/interfaces/userApi.interface";
import relationApi from "../../../../api/relationApi";
import userApi from "../../../../api/userApi";
import { ThemeColor } from "../../../../common/styles/theme.style";
import useUserStore from "../../../../store/user.zustand";
import CreatePost from "../../../../common/posts/components/CreatePost";
import ProfileTab from "./ProfileTab";
import { Link } from "react-router-dom";

const ProfileCard = ({ uid }: Uid) => {
  const queryClient = useQueryClient();

  // client's uid
  const { uid: clientUid } = useUserStore();

  // profile user's info
  const { data: userinfo } = useQuery({
    queryKey: ["user", { uid: uid }],
    queryFn: () => userApi.getUserInfo({ uid }),
  });
  const username = userinfo?.username;
  const profileImage = userinfo?.profile_image_url;

  // profile user's following list
  const { data: userFollowing } = useQuery({
    queryKey: ["following", { uid: uid }],
    queryFn: () => relationApi.getUserFollowing({ uid }),
  });

  // profile user's follower list
  const { data: userFollowers, isLoading: followersLoading } = useQuery({
    queryKey: ["followers", { uid: uid }],
    queryFn: () => relationApi.getUserFollowers({ uid }),
  });

  // follow mutation
  const { mutate: followUser } = useMutation({
    mutationFn: () => relationApi.followUser({ uid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: uid }]);
    },
  });

  // unfollow mutation
  const { mutate: unfollowUser } = useMutation({
    mutationFn: () => relationApi.unfollowUser({ uid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: uid }]);
    },
  });

  return (
    <>
      <Card
        bgColor={"blue.700"}
        color="white"
        border={`double ${ThemeColor.backgroundColorDarker}`}
        direction={{ base: "column", sm: "row" }}
        borderTopRadius={"1em"}
        borderBottomRadius={"0"}
        sx={{
          "@media screen and (max-width: 350px)": {
            w: "100%",
          },
        }}
      >
        <CardHeader
          w="100%"
          sx={{
            paddingRight: "0.2em",
            paddingLeft: "0.2em",
            "@media screen and (max-width:350px)": { paddingLeft: "0.2em" },
          }}
        >
          <div style={{ display: "flex" }}>
            <Img
              src={profileImage}
              alt={`${username}'s profile image`}
              borderRadius={"2em"}
              objectFit={"cover"}
              sx={{
                w: "6em",
                h: "6em",
                borderRadius: "2em",
                "@media screen and (max-width: 350px)": {
                  maxW: "5em;",
                  maxH: "5em;",
                  borderRadius: "1em",
                },
              }}
            />
            <Stack paddingRight={"0"}>
              <Box>
                <Heading paddingLeft={"0.2em"}>{username}</Heading>
                <Text fontSize={"0.6em"} paddingLeft="0.7em">
                  <LinkChakra as={Link} to="followers">
                    {userFollowers ? userFollowers.length : 0} followers
                  </LinkChakra>
                  {" · "}
                  <LinkChakra as={Link} to="following">
                    {userFollowing ? userFollowing.length : 0} following
                  </LinkChakra>
                </Text>
              </Box>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div>
                  <Avatar
                    marginLeft={"0.2em"}
                    name={"Powerlifter"}
                    bgColor={ThemeColor.basicColor}
                    src={
                      "https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png"
                    }
                    sx={{
                      "@media screen and (max-width: 350px)": {
                        w: "2em",
                        h: "2em",
                      },
                    }}
                  />
                  <Avatar
                    marginLeft={"0.2em"}
                    name={"Powerlifter"}
                    bgColor={ThemeColor.basicColor}
                    src={
                      "https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png"
                    }
                    sx={{
                      "@media screen and (max-width: 350px)": {
                        w: "2em",
                        h: "2em",
                      },
                    }}
                  />
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {clientUid !== uid &&
                    (userFollowers?.includes(clientUid) ? (
                      <Button variant="solid" onClick={() => unfollowUser()}>
                        {followersLoading ? <Spinner /> : "Unfollow"}
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => followUser()}>
                        {followersLoading ? <Spinner /> : "Follow"}
                      </Button>
                    ))}
                </div>
              </div>
            </Stack>
          </div>
        </CardHeader>
      </Card>
      <hr />
      <hr />
      <ProfileTab />
      <CreatePost />
    </>
  );
};

export default ProfileCard;
