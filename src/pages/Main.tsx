import React from "react";
import { Routes, Route } from "react-router-dom";

import ErrorPage from "./ErrorPage";

import useUserStore from "../store/user.zustand";
import Routine from "./routine/Routine";
import BottomNav from "./BottomNav";
import ProfileRoute from "./profile/ProfileRoute";
import Home from "./home/Home";
import { Img } from "@chakra-ui/react";
import Statistics from "./statistics/Statistics";

const Main = () => {
  let username = useUserStore((state) => state.username);
  username = username || "";
  return (
    // Main page(signed in)
    <React.Fragment>
      {/*registered === false && <Navigate to="/register" />*/}
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="group"
          element={
            <Img
              objectFit="cover"
              src="https://media.tenor.com/t3buP-QoO9oAAAAM/jim-carrey-work.gif"
            />
          }
        />
        <Route path="routine/*" element={<Routine />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="profile/*" element={<ProfileRoute />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <BottomNav username={username} />
    </React.Fragment>
  );
};

export default Main;
