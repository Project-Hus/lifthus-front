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
  authApi.updateSession().then((res) => {
    if (res.uid && res.username) {
      setUserInfo({ uid: res.uid });
      setUserInfo({ username: res.username });
      console.log(res.uid, "signed in");
    } else console.log("not signed in");
  });

  const user_id = useUserStore((state) => state.uid);
  const registered = useUserStore((state) => state.registered);

  return (
    <AppStyled>
      <Routes>
        <Route path="/pending/*" element={<Pending />} />
        {/* If the user has signed in and registered Let the Main component take control. */}
        {user_id && registered && <Route path="/*" element={<Main />} />}
        {/* If the user has signed but not registered, the user have to register him or herself */}
        {user_id && !registered && (
          <Route>
            <Route path="/" element={<Navigate to="/register/" />} />
            <Route path="/register/*" element={<Register />} />
          </Route>
        )}
        {/* If the user hasn't signed in, the user needs to be authenticated */}
        {!user_id && (
          <Route>
            <Route index path="/*" element={<FirstPage />} />
          </Route>
        )}
      </Routes>
    </AppStyled>
  );
};

export default App;
