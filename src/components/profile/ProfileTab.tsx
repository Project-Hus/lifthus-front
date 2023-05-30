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

import "./calendar.css";

import { Card, CardBody } from "@chakra-ui/card";
import {
  CalendarIcon,
  DragHandleIcon,
  LinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import CalendarHeatmap from "react-calendar-heatmap";
import { Avatar, FormLabel } from "@chakra-ui/react";
import ProfileSetting from "./profileTab/ProfileSetting";
import { ThemeColor } from "../../common/styles/theme.style";
import { GetUserInfoDto } from "../../api/dtos/user.dto";
import ProfileContact from "./profileTab/ProfileContact";

const ProfileTab = ({ user }: { user: GetUserInfoDto }) => {
  // later query last rec
  const sbd_total = 460; // s + b + d
  return (
    <Tabs
      size="lg"
      bgColor={ThemeColor.backgroundColorDarker}
      variant="unstyled"
      align="end"
      borderBottomRadius={"1em"}
    >
      <TabList>
        <Tab
          w="25%"
          _hover={{ bgColor: "green.300" }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          <CalendarIcon />
        </Tab>
        <Tab
          w="25%"
          _hover={{ bgColor: "green.300" }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          <LinkIcon />
        </Tab>
        <Tab
          w="25%"
          _hover={{ bgColor: "blue.400" }}
          _selected={{ color: "white", bg: "blue.500" }}
        >
          <DragHandleIcon />
        </Tab>
        <Tab
          w="25%"
          _hover={{ bgColor: "yellow.400" }}
          _selected={{ color: "white", bg: "yellow.500" }}
          paddingLeft="1.5em"
          paddingRight="1.5em"
        >
          <SettingsIcon />
        </Tab>
      </TabList>
      <TabPanels textAlign={"center"}>
        <TabPanel>
          <CalendarHeatmap
            startDate={new Date(new Date().setMonth(new Date().getMonth() - 9))}
            endDate={new Date()}
            monthLabels={[]}
            values={[
              { date: "2023-01-02", count: 2 },
              { date: "2023-01-03", count: 3 },
              { date: "2023-01-04", count: 4 },
              { date: "2023-01-05", count: 4 },
              { date: "2023-01-06", count: 2 },
              { date: "2023-01-07", count: 4 },
              { date: "2023-01-08", count: 4 },
              { date: "2023-01-09", count: 4 },
            ]}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
          />
          <div>
            <Avatar
              margin={"0.2em"}
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
              margin={"0.2em"}
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
              margin={"0.2em"}
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
        </TabPanel>
        <TabPanel>
          <ProfileContact user={user} />
        </TabPanel>
        <TabPanel>
          <FormLabel textAlign={"center"} fontSize="1em" fontWeight={"bold"}>
            BIG 3
          </FormLabel>
          <StatGroup
            border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
            borderRadius="1em"
            padding="0.5em"
          >
            <Stat>
              <StatLabel>Squat</StatLabel>
              <StatNumber>
                {160}
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
                {120}
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
                {180}
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
          <FormLabel textAlign={"center"} fontSize="1em" fontWeight={"bold"}>
            Body
          </FormLabel>
          <StatGroup
            border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
            borderRadius="1em"
            padding="0.5em"
          >
            <Stat>
              <StatLabel>Height</StatLabel>
              <StatNumber>
                {183}
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
                {105}
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
                {18}
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
        </TabPanel>
        <TabPanel>
          <ProfileSetting />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTab;
