import React, { Suspense, useState } from "react";
import { useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Posts";
import repsApi from "../../../api/postApi";
import { RepContent } from "../../../api/interfaces/postApi.interface";
import userApi from "../../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../../common/components/ErrorPage";
import BlueSpinner from "../../../common/components/spinners/BlueSpinner";

const Profile = () => {
  const username = useParams().username;

  const [reps, setReps] = useState<RepContent[]>([]);

  const { data: user_id_obj } = useQuery({
    queryKey: ["user_id", username],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getIdByName({ username }),
  });
  const user_id = user_id_obj?.user_id;

  const { data } = useQuery({
    queryKey: ["reps", user_id],
    queryFn: () =>
      typeof user_id === "undefined"
        ? Promise.reject(new Error("undefined"))
        : repsApi.getUserPosts({ user_id }),
    onSuccess: (data) => {
      setReps(data);
    },
    enabled: !!user_id,
  });

  if (!!user_id)
    return (
      <BasicPageLayout>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => <ErrorPage />}
              onReset={reset}
            >
              <Suspense fallback={<BlueSpinner />}>
                <ProfileCard user_id={user_id} />
              </Suspense>
              <Suspense fallback={<BlueSpinner />}>
                <Reps reps={reps} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BasicPageLayout>
    );
  return <ErrorPage />;
};

export default Profile;
