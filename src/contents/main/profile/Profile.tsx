import React from "react";

import { ThemeColor } from "../../../common/styles/theme.style";

import styled from "@emotion/styled";

import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";

import useUserStore from "../../../store/user.zustand";
import ProfileCard from "./components/ProfileCard";
import ProfileTab from "./components/ProfileTab";
import Reps from "../liftlogs/Reps";

const Profile = () => {
  const user_info = useUserStore((state) => state);
  const sbd_total = user_info.squat + user_info.benchpress + user_info.deadlift;
  return (
    <ProfilePage>
      <ProfileCard />
      <hr />
      <ProfileTab />
      <hr />
      <br />
      <Reps />
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
