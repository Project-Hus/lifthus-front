import React from "react";

import styled from "@emotion/styled";
import { ThemeColor } from "./common/styles/theme.style";

import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./pages/main/Main";

import useUserStore from "./store/user.zustand";
import FirstPage from "./pages/sign/FirstPage";
import Register from "./pages/register/Register";

import authApi from "./api/authApi";
import Pending from "./pages/pending/Pending";
import userApi from "./api/userApi";
import { GetUserInfoDto } from "./api/dtos/user.dto";

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
  /* ===== checking session to get signed or unsigned session ===== */
  authApi.updateSession().then(async (res) => {
    if (res.uid) {
      const userInfo = await userApi.getUserInfo({ uid: res.uid });
      setUserInfo(userInfo);
      console.log(userInfo, "YOs");
    } else console.log("not signed in");
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
