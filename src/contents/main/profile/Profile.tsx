import React, { Suspense, useState } from "react";
import { Navigate, useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../reps/Reps";
import repsApi from "../../../api/repsApi";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";
import userApi from "../../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { UserId } from "../../../api/interfacaes/userApi.interface";
import ErrorPage from "../../../common/components/ErrorPage";
import { Spinner } from "@chakra-ui/react";
import { StatusInfo } from "../../../api/interfacaes/statusCode";

const Profile = () => {
  const username = useParams().username;

  const [reps, setReps] = useState<RepContent[]>([]);

  const { data: user_id_obj, isSuccess } = useQuery({
    queryKey: ["user_id", username],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.get_id_by_name({ username }),
  });
  const user_id = user_id_obj?.user_id;

  const { data } = useQuery({
    queryKey: ["reps", user_id],
    queryFn: () =>
      typeof user_id === "undefined"
        ? Promise.reject(new Error("undefined"))
        : repsApi.get_user_reps({ user_id }),
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
              <Suspense
                fallback={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                }
              >
                <ProfileCard user_id={user_id} />
              </Suspense>
              <Suspense
                fallback={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                }
              >
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
