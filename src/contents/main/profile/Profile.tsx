import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Reps";
import repsApi from "../../../api/repsApi";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";

const Profile = () => {
  const navigate = useNavigate();
  const username = useParams().username;
  const [reps, setReps] = useState<RepContent[]>([]);
  useEffect(() => {
    if (username === undefined) navigate("/error");
    else setReps(repsApi.get_user_reps(username));
  });
  return (
    <BasicPageLayout>
      <ProfileCard username={username || ""} />
      <Reps reps={reps} />
    </BasicPageLayout>
  );
};

export default Profile;
