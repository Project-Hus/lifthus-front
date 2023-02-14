import React from "react";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";

import { ThemeColor } from "../../../../common/styles/theme.style";

import useUserStore from "../../../../store/user.zustand";

import { Card, CardBody } from "@chakra-ui/card";

const ProfileTab = () => {
  const user_info = useUserStore((state) => state);
  const sbd_total = user_info.squat + user_info.benchpress + user_info.deadlift;
  return (
    <Tabs
      bgColor={ThemeColor.backgroundColorDarker}
      variant="unstyled"
      align="end"
      borderBottomRadius={"1em"}
    >
      <TabList>
        <Tab
          _hover={{ bgColor: ThemeColor.backgroundColor }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          Calendar
        </Tab>
        <Tab
          _hover={{ bgColor: ThemeColor.backgroundColor }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          INFO
        </Tab>
        <Tab
          _hover={{ bgColor: ThemeColor.backgroundColor }}
          _selected={{ color: "white", bg: "blue.500" }}
        >
          S/B/D
        </Tab>
        <Tab
          _hover={{ bgColor: ThemeColor.backgroundColor }}
          _selected={{ color: "white", bg: "blue.500" }}
        >
          Body
        </Tab>
      </TabList>
      <TabPanels textAlign={"center"}>
        <TabPanel>잔디밭</TabPanel>
        <TabPanel>
          <Card
            borderRadius={"1em"}
            bgColor={ThemeColor.backgroundColor}
            color={"white"}
          >
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    🏢 Company
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    PKNU
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    🗺️ Location
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Busan
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    ☏ Contact
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    lifthus531@gmail.com
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </TabPanel>
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
          <p>
            <StatGroup
              border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
              borderRadius="1em"
              padding="0.5em"
            >
              <Stat>
                <StatLabel>Height</StatLabel>
                <StatNumber>
                  {user_info.height}
                  <Text display={"inline"} fontSize="0.5em">
                    cm
                  </Text>
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Weight</StatLabel>
                <StatNumber>
                  {user_info.body_weight}
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
                  <Text>Fat Percentage</Text>
                </StatLabel>
                <StatNumber>
                  {user_info.fat_percentage}
                  <Text display={"inline"} fontSize="0.5em">
                    %
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
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTab;
