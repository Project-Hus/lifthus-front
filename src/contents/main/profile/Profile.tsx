import React from "react";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Reps";
import { useParams } from "react-router";

const Profile = () => {
  const username = useParams().username;
  return (
    <BasicPageLayout>
      <ProfileCard username={username} />
      <br />
      <Reps />
    </BasicPageLayout>
  );
};

export default Profile;
