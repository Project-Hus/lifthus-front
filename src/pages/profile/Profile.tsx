import React from "react";
import { Route, Routes, useParams } from "react-router";
import userApi from "../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";

import ErrorPage from "../error/ErrorPage";
import FollowList from "./FollowList";
import useUserStore from "../../store/user.zustand";

import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTab from "../../components/profile/ProfileTab";
import { ErrorBoundary } from "react-error-boundary";
import UsersPosts from "../../components/posts/UsersPosts";
import CreatePost from "../../components/posts/CreatePost";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";
import { Text } from "@chakra-ui/react";

const Profile = () => {
  // Client's UID
  const { uid: clientUid } = useUserStore();

  // profile username
  const username = useParams().username;
  // query current profile's user information
  const { data: profileUser, isLoading } = useQuery({
    queryKey: ["user", { username }],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getUserInfoByUsername({ username }),
    onError: (error) => {
      return undefined;
    },
    retry: false,
  });

  if (profileUser === undefined && !isLoading)
    return (
      <FlexCenterLayout>
        <Text fontWeight={"bold"} fontSize={"2em"}>
          404 <br />
          😮 No user found 😭
        </Text>
      </FlexCenterLayout>
    );

  const profileUid = profileUser?.uid;
  const users = !profileUid ? [] : [profileUid];

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => <ErrorPage />}
          onReset={reset}
        >
          {!!profileUser && <ProfileCard userInfo={profileUser} />}
          <Routes>
            <Route
              index
              element={
                <>
                  {!!profileUser && <ProfileTab userInfo={profileUser} />}
                  {clientUid === profileUid && <CreatePost />}
                  {!isLoading && <UsersPosts uids={users} />}
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
