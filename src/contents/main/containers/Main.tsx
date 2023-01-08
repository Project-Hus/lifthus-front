import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Logo from "../../../logo.svg";

import FirstPage from "../components/FirstPage";

import BottomNav from "./BottomNav";

import ErrorPage from "../../../common/components/ErrorPage";

const Main = () => {
  const app = { id: null, registered: false };
  if (app.id === null)
    // Main page(Not signed in)
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route
            path="*"
            element={
              <React.Fragment>
                <Logo />
                <div>에러 발생 ㅠ</div>
              </React.Fragment>
            }
          />
        </Routes>
      </React.Fragment>
    );
  return (
    // Main page(signed in)
    <React.Fragment>
      {app.registered === false && <Navigate to="/regioster" />}
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
