import React from "react";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

import {
  CalendarIcon,
  DragHandleIcon,
  LinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import ProfileSetting from "./profileTab/ProfileSetting";
import { ThemeColor } from "../../common/styles/theme.style";
import { UserDto } from "../../api/dtos/user.dto";
import ProfileContact from "./profileTab/ProfileContact";
import ProfileHeatmap from "./profileTab/ProfileHeatmap";
import ProfileFigure from "./profileTab/ProfileFigure";

const ProfileTab = ({ userInfo }: { userInfo: UserDto | undefined }) => {
  return (
    <Tabs
      size="lg"
      bgColor={ThemeColor.backgroundColorDarker}
      variant="unstyled"
      align="end"
      borderBottomRadius={"1em"}
    >
      <TabList>
        {/* Heatmap Tab */}
        <Tab
          w="25%"
          _hover={{ bgColor: "green.300" }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          <CalendarIcon />
        </Tab>
        {/* Connection Tab */}
        <Tab
          w="25%"
          _hover={{ bgColor: "green.300" }}
          _selected={{ color: "white", bg: "green.400" }}
        >
          <LinkIcon />
        </Tab>
        {/* Figure Tab */}
        <Tab
          w="25%"
          _hover={{ bgColor: "blue.400" }}
          _selected={{ color: "white", bg: "blue.500" }}
        >
          <DragHandleIcon />
        </Tab>
        {/* Setting Tab */}
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
          <ProfileHeatmap />
        </TabPanel>
        <TabPanel>
          <ProfileContact userInfo={userInfo} />
        </TabPanel>
        <TabPanel>
          <ProfileFigure />
        </TabPanel>
        <TabPanel>
          <ProfileSetting />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTab;
