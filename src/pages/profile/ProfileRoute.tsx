import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../../common/components/ErrorPage";
import Routine from "../routine/Routine";
import Profile from "./Profile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path=":username" element={<Profile />} />
      <Route path=":username/following" element={<div>following</div>} />
      <Route path=":username/followers" element={<div>followers</div>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ProfileRoute;
