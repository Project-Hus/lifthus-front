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
import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { Link } from "react-router-dom";
import { Uid } from "../../../../api/interfaces/userApi.interface";
import userApi from "../../../../api/userApi";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import { ThemeColor } from "../../../../common/styles/theme.style";
import CreatePost from "./CreatePost";
import ProfileTab from "./ProfileTab";

const ProfileCard = ({ uid }: Uid) => {
  const { data } = useQuery({
    queryKey: ["username", uid],
    queryFn: () => userApi.getUserInfo({ uid }),
  });
  const username = data?.username;
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
              src={USER_PROFILE_IMAGE_ROUTE + username + ".jpeg"}
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
                  <LinkChakra>{5} followers</LinkChakra>
                  {" · "}
                  <LinkChakra>{8} following</LinkChakra>
                  {" · "}
                  <LinkChakra>{2} groups</LinkChakra>
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
                  <Button variant="outline">Follow</Button>
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
