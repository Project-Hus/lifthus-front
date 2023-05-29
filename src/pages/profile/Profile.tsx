import React, { Suspense, useState } from "react";
import { Route, Routes, useParams } from "react-router";

import BasicPageLayoutNoMargin from "../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/Profile/ProfileCard";
import repsApi from "../../api/postApi";
import userApi from "../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../common/components/ErrorPage";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Posts from "../../common/posts/Posts";
import ProfileTab from "./components/Profile/ProfileTab";
import FollowList from "./FollowList";
import CreatePost from "../../common/posts/components/CreatePost";
import useUserStore from "../../store/user.zustand";

const Profile = () => {
  const username = useParams().username;

  const { uid: clientUid } = useUserStore();

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
      <BasicPageLayoutNoMargin>
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
                  <Route index element={<ProfileTab />} />
                  <Route index element={<Posts posts={posts ? posts : []} />} />
                  <Route
                    path="following"
                    element={<FollowList type="following" />}
                  />
                  <Route
                    path="followers"
                    element={<FollowList type="followers" />}
                  />
                </Routes>
                <Routes>
                  <Route
                    index
                    element={
                      <>
                        {clientUid === user.uid ? <CreatePost /> : null}
                        <Posts posts={posts ? posts : []} />
                      </>
                    }
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BasicPageLayoutNoMargin>
    );
  return <ErrorPage />;
};

export default Profile;
