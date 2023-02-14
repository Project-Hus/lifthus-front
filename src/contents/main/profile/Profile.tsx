import React from "react";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import ProfileTab from "./components/ProfileTab";
import Reps from "../reps/Reps";

import useUserStore from "../../../store/user.zustand";

const Profile = () => {
  const user_info = useUserStore((state) => state);
  const sbd_total = user_info.squat + user_info.benchpress + user_info.deadlift;
  return (
    <BasicPageLayout>
      <ProfileCard />
      <hr />
      <hr />
      <ProfileTab />
      <br />
      <Reps />
    </BasicPageLayout>
  );
};

export default Profile;
