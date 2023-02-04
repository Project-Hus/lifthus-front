import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import ErrorPage from "../../common/components/ErrorPage";

import FirstPage from "../sign/FirstPage";
import useAppStore from "../../store/app.zustand";
import BottomNav from "./components/BottomNav";

const Main = () => {
  const user_id = useAppStore((state) => state.user_id);
  const registered = false;
  return (
    // Main page(signed in)
    <React.Fragment>
      {/*registered === false && <Navigate to="/register" />*/}
      <BottomNav />
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="group" element={<div>group</div>} />
        <Route path="training" element={<div>training</div>} />
        <Route path="statistics" element={<div>statistics</div>} />
        <Route path="profile" element={<div>PROFILE</div>} />
        <Route path="profile/userinfo" element={<div>PROFILE/USERINFO</div>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default Main;
