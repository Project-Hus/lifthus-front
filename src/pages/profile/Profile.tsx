import React, { Suspense } from "react";
import { Route, Routes, useParams } from "react-router";
import repsApi from "../../api/postApi";
import userApi from "../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";

import ErrorPage from "../error/ErrorPage";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import Posts from "../../components/Posts";
import FollowList from "./FollowList";
import useUserStore from "../../store/user.zustand";
import CreatePost from "../../components/posts/CreatePost";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTab from "../../components/profile/ProfileTab";
import Pending from "../pending/Pending";
import { ErrorBoundary } from "react-error-boundary";

const Profile = () => {
  // Client's UID
  const { uid: clientUid } = useUserStore();

  // profile username
  const username = useParams().username;
  // query current profile's user information
  const { data: profileUser } = useQuery({
    queryKey: ["user", { username }],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getUserInfoByUsername({ username }),
  });

  const profileUid = profileUser?.uid;

  // query current profile's posts
  const { data: posts } = useQuery({
    queryKey: ["posts", { profileUid }],
    queryFn: () =>
      typeof username === "undefined" || typeof profileUid === "undefined"
        ? Promise.reject(new Error("undefined"))
        : repsApi.getUserPosts({ uid: profileUid }),
    enabled: !!profileUid,
  });

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => <ErrorPage />}
          onReset={reset}
        >
          <ProfileCard userInfo={profileUser} />
          <Routes>
            <Route
              index
              element={
                <>
                  <ProfileTab userInfo={profileUser} />
                  {clientUid === profileUid && <CreatePost />}
                  <Posts posts={posts || []} />
                </>
              }
            />
            <Route path="following" element={<FollowList type="following" />} />
            <Route path="followers" element={<FollowList type="followers" />} />
          </Routes>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Profile;
