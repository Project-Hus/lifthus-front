import React from "react";

import { USER_PROFILE_IMAGE_ROUTE } from "../../common/routes";
import { ThemeColor } from "../../common/styles/theme.style";

import styled from "@emotion/styled";

import { Img } from "@chakra-ui/image";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { FormLabel } from "@chakra-ui/form-control";

import { EditIcon } from "@chakra-ui/icons";

import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";

import useAppStore from "../../store/app.zustand";

const Profile = () => {
  const user_info = useAppStore((state) => state);
  const sbd_total = user_info.squat + user_info.benchpress + user_info.deadlift;
  return (
    <ProfilePage>
      <Card
        marginTop={"0.1em"}
        bgColor={"blue.800"}
        color="white"
        border={`double ${ThemeColor.backgroundColorDarker}`}
        direction={{ base: "column", sm: "row" }}
        borderTopRadius={"1em"}
        borderBottomRadius={"0"}
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
          <div>
            <div>
              <FormLabel
                display={"inline"}
                fontSize={"1.5em"}
                paddingLeft={"0.2em"}
              >
                {user_info.nickname}
              </FormLabel>

              <EditIcon _hover={{ cursor: "pointer" }} />
            </div>
            <div>
              <Text
                border={` ${ThemeColor.backgroundColorDarker}`}
                fontSize={"0.6em"}
                borderRadius="1em"
                padding="0.7em"
              >
                Thinking out loud ~ People fall in love in mysterious
              </Text>
            </div>
          </div>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
      <hr />
      <Tabs
        bgColor={ThemeColor.backgroundColorDarker}
        variant="unstyled"
        align="end"
      >
        <TabList>
          <Tab
            border={"double"}
            _hover={{ bgColor: ThemeColor.backgroundColor }}
            _selected={{ color: "white", bg: "blue.500" }}
          >
            S/B/D
          </Tab>
          <Tab
            _hover={{ bgColor: ThemeColor.backgroundColor }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Lift Logs
          </Tab>
        </TabList>
        <TabPanels textAlign={"center"}>
          <TabPanel>
            <p>
              <StatGroup
                border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
                borderRadius="1em"
                padding="0.5em"
              >
                <Stat>
                  <StatLabel>Squat</StatLabel>
                  <StatNumber>
                    {user_info.squat}
                    <Text display={"inline"} fontSize="0.5em">
                      kg
                    </Text>
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Benchpress</StatLabel>
                  <StatNumber>
                    {user_info.benchpress}
                    <Text display={"inline"} fontSize="0.5em">
                      kg
                    </Text>
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Deadlift</StatLabel>
                  <StatNumber>
                    {user_info.deadlift}
                    <Text display={"inline"} fontSize="0.5em">
                      kg
                    </Text>
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>
                    <Text>Total</Text>
                  </StatLabel>
                  <StatNumber>
                    {sbd_total}
                    <Text display={"inline"} fontSize="0.5em">
                      kg
                    </Text>
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

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
