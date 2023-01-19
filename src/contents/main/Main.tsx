import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Logo from "../../logo.svg";

import BottomNav from "./BottomNav";

import ErrorPage from "../../common/components/ErrorPage";

import FirstPage from "../sign/FirstPage";
import useAppStore from "../../store/app.zustand";

const Main = () => {
  const user_id = useAppStore((state) => state.user_id);
  const registered = false;
  return (
    // Main page(signed in)
    <React.Fragment>
      {/*registered === false && <Navigate to="/register" />*/}
      <BottomNav />
      <Routes>
        <Route index element={<Link to="/">abc</Link>} />

        <Route path="profile" element={<div />} />
        <Route path="profile/userinfo" element={<div />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default Main;
