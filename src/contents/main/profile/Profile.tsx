import React from "react";

import styled from "@emotion/styled";

import useUserStore from "../../../store/user.zustand";
import ProfileCard from "./components/ProfileCard";
import ProfileTab from "./components/ProfileTab";
import Reps from "../reps/Reps";
import { ThemeColor } from "../../../common/styles/theme.style";

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
  margin: auto;
  background-color: ${ThemeColor.backgroundColor};
  @media (min-width: 700px) {
    width: 60vw;
    min-width: 700px;
  }
`;
