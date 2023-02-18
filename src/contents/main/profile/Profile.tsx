import React, { useState } from "react";
import { Navigate, useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Reps";
import repsApi from "../../../api/repsApi";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";
import userApi from "../../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import { UserId, Username } from "../../../api/interfacaes/userApi.interface";
import { ErrorBoundary } from "react-error-boundary";

const Profile = () => {
  const username = useParams().username;

  if (username) {
    const [reps, setReps] = useState<RepContent[]>([]);

    // Then get the user's projects
    const {
      status,
      fetchStatus,
      data: projects,
    } = useQuery({
      queryKey: ["projects", userId],
      queryFn: getProjectsByUser,
      // The query will not execute until the userId exists
      enabled: !!userId,
    });

    const tmp: Username = { username };
    const { data: user_id } = useQuery({
      queryKey: ["user_id", tmp],
      queryFn: userApi.get_id_by_name,
    });

    const { data } = useQuery({
      queryKey: ["reps", user_id],
      queryFn: async () => {},
      enabled: !!user_id,
    });

    if (ok)
      return (
        <BasicPageLayout>
          <ProfileCard user_id={user_id} />
          <ErrorBoundary>
            <Reps reps={reps} />
          </ErrorBoundary>
        </BasicPageLayout>
      );
  }
  return <Navigate to="/erorr" />;
};

export default Profile;
