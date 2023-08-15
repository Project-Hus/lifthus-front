import React from "react";
import { Routes, Route } from "react-router-dom";
import useUserStore from "../store/user.zustand";
import Routine from "./routine/Routine";
import BottomNav from "../components/BottomNav";
import ProfileRoute from "./profile/ProfileRoute";
import Home from "./home/Home";
import { Img } from "@chakra-ui/react";
import Statistics from "./statistics/Statistics";
import { BasicPageLayoutNoMargin } from "../common/components/layouts/BasicPageLayout";
import Group from "./group/group";

const Main = () => {
  let username = useUserStore((state) => state.username);
  username = username || "";
  return (
    // Main page(signed in)
    <BasicPageLayoutNoMargin>
      {/*registered === false && <Navigate to="/register" />*/}
      <Routes>
        <Route index element={<Home />} />
        <Route path="followings" element={<Home />} />
        <Route path="group" element={<Group />} />
        <Route path="routine/*" element={<Routine />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="profile/*" element={<ProfileRoute />} />
      </Routes>
      <BottomNav />
    </BasicPageLayoutNoMargin>
  );
};

export default Main;
