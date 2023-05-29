import React from "react";
import { Routes, Route } from "react-router-dom";

import ErrorPage from "../common/components/ErrorPage";

import useUserStore from "../store/user.zustand";
import Routine from "./routine/Routine";
import BottomNav from "./BottomNav";
import ProfileRoute from "./profile/ProfileRoute";

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
        <Route path="routine/*" element={<Routine />} />
        <Route path="statistics" element={<div>statistics</div>} />
        <Route path="profile/*" element={<ProfileRoute />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <BottomNav username={username} />
    </React.Fragment>
  );
};

export default Main;
