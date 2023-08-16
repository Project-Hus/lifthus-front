import React from "react";
import { Route, Routes, useParams } from "react-router";
import repsApi from "../../api/postApi";
import userApi from "../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";

import ErrorPage from "../error/ErrorPage";
import Posts from "../../components/Posts";
import FollowList from "./FollowList";
import useUserStore from "../../store/user.zustand";
import CreatePost from "../../components/posts/CreatePost";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTab from "../../components/profile/ProfileTab";
import { ErrorBoundary } from "react-error-boundary";
import UsersPosts from "../../components/UsersPosts";

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
                  <UsersPosts uids={!profileUid ? [] : [profileUid]} />
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
