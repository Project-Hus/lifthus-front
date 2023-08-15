import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import Profile from "./Profile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path=":username/*" element={<Profile />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ProfileRoute;
