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
import React from "react";
import { Link } from "react-router-dom";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import { ThemeColor } from "../../../../common/styles/theme.style";

const ProfileCard = ({ username }: { username: string | undefined }) => {
  return (
    <Card
      bgColor={"blue.700"}
      color="white"
      border={`double ${ThemeColor.backgroundColorDarker}`}
      direction={{ base: "column", sm: "row" }}
      borderTopRadius={"1em"}
      borderBottomRadius={"0"}
    >
      <CardHeader w="100%" paddingRight="0">
        <div style={{ display: "flex" }}>
          <Img
            src={USER_PROFILE_IMAGE_ROUTE + username + ".jpeg"}
            alt={`${username}'s profile image`}
            borderRadius={"2em"}
            objectFit={"cover"}
            minW={"6em"}
            minH={"6em"}
            maxW="6em"
            maxH="6em"
          />
          <Stack paddingRight={"0"}>
            <Box>
              <Heading paddingLeft={"0.2em"}>{username}</Heading>
              <Text fontSize={"0.6em"} paddingLeft="0.7em">
                <Link to="">
                  <LinkChakra>{5} followers</LinkChakra>
                </Link>
                {" · "}
                <Link to="">
                  <LinkChakra>{8} following</LinkChakra>
                </Link>
                {" · "}
                <Link to="">
                  <LinkChakra>{2} groups</LinkChakra>
                </Link>
              </Text>
            </Box>
            <div style={{ paddingLeft: "0.2em" }}>
              <Avatar
                name={"Powerlifter"}
                bgColor={ThemeColor.basicColor}
                src={
                  "https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png"
                }
              />
            </div>
          </Stack>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileCard;
