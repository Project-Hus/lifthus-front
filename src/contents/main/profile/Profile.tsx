import React from "react";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import ProfileTab from "./components/ProfileTab";
import Reps from "../reps/Reps";
import { useParams } from "react-router";
import { Img } from "@chakra-ui/image";

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
