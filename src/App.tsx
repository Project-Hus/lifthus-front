import React from "react";

import styled from "@emotion/styled";
import { ThemeColor } from "./common/styles/theme.style";

import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";

import useUserStore from "./store/user.zustand";
import FirstPage from "./pages/sign/FirstPage";
import Register from "./pages/register/Register";

import authApi from "./api/authApi";
import Pending from "./pages/pending/Pending";
import userApi from "./api/userApi";
import { HUS_AUTH_URL } from "./common/routes";
import {
  SessionCreated,
  SessionUserInfo,
} from "./api/interfaces/authApi.interface";

const AppStyled = styled.div`
  background-color: ${ThemeColor.backgroundColor};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(14px + 2vmin);
  color: white;
  padding-bottom: 10vh;
`;

const App = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  /* ===== automatic SSO ===== */
  authApi.updateSession().then(async (res) => {
    const created: SessionCreated | undefined = res.created;
    const user: SessionUserInfo | undefined = res.user;
    if (!!created) {
      // if new session is created, redirect to Cloudhus and connect to the hussession.
      const currentURL = window.location.href;
      window.location.href = `${HUS_AUTH_URL}/auth/hus?service=lifthus&sid=${
        created.sid
      }&redirect=${encodeURIComponent(currentURL)}`;
    } else if (!!user) {
      const userInfo = await userApi.getUserInfo({ uid: Number(user.uid) });
      setUserInfo(userInfo);
      console.log(userInfo, "user signed");
    } else console.log("not signed");
  });

  const uid = useUserStore((state) => state.uid);
  const registered = useUserStore((state) => state.registered);

  return (
    <AppStyled>
      <Routes>
        <Route path="/pending/*" element={<Pending />} />
        {/* If the user has signed in and registered Let the Main component take control. */}
        {uid && registered && <Route path="/*" element={<Main />} />}
        {/* If the user has signed but not registered, the user have to register him or herself */}
        {uid && !registered && (
          <Route>
            <Route path="/" element={<Navigate to="/register/" />} />
            <Route path="/register/*" element={<Register />} />
          </Route>
        )}
        {/* If the user hasn't signed in, the user needs to be authenticated */}
        {!uid && (
          <Route>
            <Route index path="/*" element={<FirstPage />} />
          </Route>
        )}
      </Routes>
    </AppStyled>
  );
};

export default App;
