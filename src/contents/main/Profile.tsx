import React from "react";

import useAppStore from "../../store/app.zustand";
import styled from "@emotion/styled";
import { Img } from "@chakra-ui/image";
import { USER_PROFILE_IMAGE_ROUTE } from "../../common/routes";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { ThemeColor } from "../../common/styles/theme.style";
import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";

const Profile = () => {
  const user_info = useAppStore((state) => state);
  return (
    <ProfilePage>
      <Card
        bgColor={ThemeColor.backgroundColor}
        color="white"
        border={`solid ${ThemeColor.backgroundColorLight}`}
      >
        <CardHeader display={"flex"}>
          <div>
            <Img
              src={USER_PROFILE_IMAGE_ROUTE + user_info.user_id + ".jpeg"}
              alt={`${user_info.nickname}'s profile image`}
              borderRadius={"2em"}
              objectFit={"cover"}
              width={"7em"}
              height={"7em"}
            />
          </div>
          <FormLabel fontSize={"1.5em"} paddingLeft={"0.2em"}>
            {user_info.nickname}
          </FormLabel>
        </CardHeader>
        <CardBody></CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Client Report</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Summary
              </Heading>
              <Text pt="2" fontSize="sm">
                View a summary of all your clients over the last month.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Overview
              </Heading>
              <Text pt="2" fontSize="sm">
                Check out the overview of your clients.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Analysis
              </Heading>
              <Text pt="2" fontSize="sm">
                See a detailed analysis of all your business clients.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <div></div>
      <hr style={{ minWidth: "100wh" }} />
    </ProfilePage>
  );
};

export default Profile;

const ProfilePage = styled.div`
  width: 90%;
`;

const ProfileArea = styled.div`
  display: flex;
  * {
    margin-bottom: auto;
  }
  button {
    margin-top: auto;
  }
`;
