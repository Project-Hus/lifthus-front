import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Reps";
import repsApi from "../../../api/repsApi";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";
import userApi from "../../../api/userApi";

const Profile = () => {
  const username = useParams().username;

  const [reps, setReps] = useState<RepContent[]>([]);

  useEffect(() => {
    if (username) {
      const { user_id, ok } = userApi.get_id_by_name(username);
      if (ok) setReps(repsApi.get_user_reps(user_id));
    }
  });

  if (username) {
    const { user_id, ok } = userApi.get_id_by_name(username);
    if (ok)
      return (
        <BasicPageLayout>
          <ProfileCard user_id={user_id} />
          <Reps reps={reps} />
        </BasicPageLayout>
      );
  }
  return <Navigate to="/erorr" />;
};

export default Profile;
