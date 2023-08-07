import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import Profile from "./Profile";
import BasicPageLayoutNoMargin from "../../common/components/layouts/BasicPageLayout";

const ProfileRoute = () => {
  return (
    <BasicPageLayoutNoMargin>
      <Routes>
        <Route path=":username/*" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BasicPageLayoutNoMargin>
  );
};

export default ProfileRoute;
