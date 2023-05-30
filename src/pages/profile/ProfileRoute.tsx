import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Profile from "./Profile";

const ProfileRoute = () => {
  return (
    <div>
      <Routes>
        <Route path=":username/*" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default ProfileRoute;
