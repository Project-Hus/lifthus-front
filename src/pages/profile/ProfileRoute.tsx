import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../../common/components/ErrorPage";
import Routine from "../routine/Routine";
import FollowList from "./FollowList";
import Profile from "./Profile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path=":username" element={<Profile />} />
      <Route
        path=":username/following"
        element={<FollowList type="following" />}
      />
      <Route
        path=":username/followers"
        element={<FollowList type="followers" />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ProfileRoute;
