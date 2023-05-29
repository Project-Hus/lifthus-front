import React, { Suspense, useState } from "react";
import { Route, Routes, useParams } from "react-router";

import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/Profile/ProfileCard";
import repsApi from "../../api/postApi";
import userApi from "../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../common/components/ErrorPage";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Posts from "../../common/posts/Posts";

const Profile = () => {
  const username = useParams().username;

  const { data: user } = useQuery({
    queryKey: ["user", { username }],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getUserInfoByUsername({ username }),
  });

  const uid = user?.uid;

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", { uid }],
    queryFn: () =>
      typeof username === "undefined" || typeof uid === "undefined"
        ? Promise.reject(new Error("undefined"))
        : repsApi.getUserPosts({ uid }),
    enabled: !!uid,
  });

  if (!!uid)
    return (
      <BasicPageLayout>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => <ErrorPage />}
              onReset={reset}
            >
              <Suspense fallback={<BlueSpinner />}>
                <ProfileCard uid={uid} />
              </Suspense>
              <Suspense fallback={<BlueSpinner />}>
                <Routes>
                  <Route index element={<Posts posts={posts ? posts : []} />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BasicPageLayout>
    );
  return <ErrorPage />;
};

export default Profile;
