import React, { Suspense, useState } from "react";
import { useParams } from "react-router";

import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";

import ProfileCard from "./components/ProfileCard";
import Reps from "../posts/Posts";
import repsApi from "../../../api/postApi";
import userApi from "../../../api/userApi";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../../common/components/ErrorPage";
import BlueSpinner from "../../../common/components/spinners/BlueSpinner";
import { QueryPostDto } from "../../../api/dtos/post.dto";
import Posts from "../posts/Posts";

const Profile = () => {
  const username = useParams().username;

  const [posts, setPosts] = useState<QueryPostDto[]>([]);

  const { data: user } = useQuery({
    queryKey: ["user", { username }],
    queryFn: () =>
      typeof username === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getUserInfoByUsername({ username }),
  });

  const uid = user?.uid;

  const { data } = useQuery({
    queryKey: ["posts", { uid }],
    queryFn: () =>
      typeof username === "undefined" || typeof uid === "undefined"
        ? Promise.reject(new Error("undefined"))
        : repsApi.getUserPosts({ uid }),
    onSuccess: (data) => {
      setPosts(data);
    },
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
                <Posts posts={posts} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BasicPageLayout>
    );
  return <ErrorPage />;
};

export default Profile;
