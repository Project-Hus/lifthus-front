import React from "react";

import { USER_PROFILE_IMAGE_ROUTE } from "../../../common/routes";
import { ThemeColor } from "../../../common/styles/theme.style";

import styled from "@emotion/styled";

import { Img } from "@chakra-ui/image";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { FormLabel } from "@chakra-ui/form-control";

import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";

import useUserStore from "../../../store/user.zustand";
import ProfileCard from "./components/ProfileCard";
import ProfileTab from "./components/ProfileTab";

const Profile = () => {
  const user_info = useUserStore((state) => state);
  const sbd_total = user_info.squat + user_info.benchpress + user_info.deadlift;
  return (
    <ProfilePage>
      <ProfileCard />
      <hr />
      <ProfileTab />
      <hr />
      <hr />
      <Card
        border={`double 0.1em ${ThemeColor.backgroundColorDarker}`}
        borderTop="none"
        borderTopRadius={0}
        bgColor={ThemeColor.backgroundColor}
        color={"white"}
      >
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
    </ProfilePage>
  );
};

export default Profile;

const ProfilePage = styled.div`
  max-width: 100wh;
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
