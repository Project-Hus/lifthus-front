import React from "react";
import { Routes, Route } from "react-router-dom";

import ErrorPage from "../../common/components/ErrorPage";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";

import useUserStore from "../../store/user.zustand";
import BottomNav from "./BottomNav";
import Profile from "./profile/Profile";

const Main = () => {
  let username = useUserStore((state) => state.username);
  username = username || "";
  return (
    // Main page(signed in)
    <React.Fragment>
      {/*registered === false && <Navigate to="/register" />*/}
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="group" element={<div>group</div>} />
        <Route path="training" element={<div>training</div>} />
        <Route path="statistics" element={<div>statistics</div>} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <BottomNav username={username} />
    </React.Fragment>
  );
};

export default Main;
