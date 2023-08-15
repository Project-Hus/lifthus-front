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
import { useQuery, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { useNavigate } from "react-router-dom";
import { GetUserInfoDto } from "../../api/dtos/user.dto";
import relationApi from "../../api/relationApi";
import { ThemeColor } from "../../common/styles/theme.style";
import useUserStore from "../../store/user.zustand";

const ProfileCard = ({
  userInfo,
}: {
  userInfo: GetUserInfoDto | undefined;
}) => {
  const profileUid = userInfo?.uid;
  const profileUsername = userInfo?.username;
  const profileImage = userInfo?.profile_image_url;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // profile user's following list
  const { data: userFollowing } = useQuery({
    queryKey: ["following", { uid: profileUid }],
    queryFn: () =>
      !profileUid
        ? Promise.reject(new Error("undefined"))
        : relationApi.getUserFollowing({ uid: profileUid }),
    enabled: !!profileUid,
  });

  // profile user's follower list
  const { data: userFollowers, isLoading: followersLoading } = useQuery({
    queryKey: ["followers", { uid: profileUid }],
    queryFn: () =>
      !profileUid
        ? Promise.reject(new Error("undefined"))
        : relationApi.getUserFollowers({ uid: profileUid }),
    enabled: !!profileUid,
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
              alt={`${profileUsername}'s profile image`}
              objectFit={"cover"}
              sx={{
                w: "5em",
                h: "5em",
                boxShadow: `0 0 0.2em 0 ${ThemeColor.basicColor} `,
                borderRadius: "1em",
                "@media screen and (max-width: 350px)": {
                  maxW: "5em;",
                  maxH: "5em;",
                  borderRadius: "1em",
                },
              }}
            />
            <Stack paddingRight={"0"}>
              <Box>
                <LinkChakra
                  onClick={() => navigate(`/profile/${userInfo?.username}`)}
                >
                  <Heading paddingLeft={"0.2em"}>{profileUsername}</Heading>
                </LinkChakra>
                <Text fontSize={"0.6em"} paddingLeft="0.7em">
                  <LinkChakra
                    onClick={() =>
                      navigate(`/profile/${profileUsername}/following`)
                    }
                  >
                    {userFollowing ? userFollowing.length : 0} following
                  </LinkChakra>
                  {" · "}
                  <LinkChakra
                    onClick={() =>
                      navigate(`/profile/${profileUsername}/followers`)
                    }
                  >
                    {userFollowers ? userFollowers.length : 0} followers
                  </LinkChakra>
                </Text>
              </Box>
            </Stack>
          </div>
        </CardHeader>
      </Card>
      <hr />
      <hr />
    </>
  );
};

export default ProfileCard;
