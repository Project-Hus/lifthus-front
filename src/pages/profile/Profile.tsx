import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router";
import userApi from "../../api/userApi";
import {
  QueryErrorResetBoundary,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import ErrorPage from "../error/ErrorPage";
import FollowList from "./FollowList";
import useUserStore from "../../store/user.zustand";
import CreatePost from "../../components/posts/CreatePost";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTab from "../../components/profile/ProfileTab";
import { ErrorBoundary } from "react-error-boundary";
import UsersPosts from "../../components/posts/UsersPosts";
import { QueryPostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import Posts from "../../components/posts/Posts";

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
  const users = !profileUid ? [] : [profileUid];

  const [posts, setPosts] = useState<QueryPostDto[]>([]);
  const [skip, setSkip] = useState(0);
  const [seen, setSeen] = useState(true);

  const { isLoading } = useQuery({
    queryKey: ["posts", { uid: profileUid }],
    queryFn: async () => {
      const posts = await postApi.getUsersPosts({
        users,
        skip,
      });
      setPosts((prev) => [...prev, ...posts]);
      setSkip((prev) => prev + posts.length);
      setSeen(false);
      return posts;
    },
    enabled: seen,
  });
  const queryClient = useQueryClient();

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
                  <Posts
                    posts={posts}
                    onScrollEnd={() => {
                      setSeen(true);
                      queryClient.invalidateQueries([
                        "posts",
                        { uid: profileUid },
                      ]);
                    }}
                  />
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
