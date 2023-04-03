import React from "react";

import styled from "@emotion/styled";
import { ThemeColor } from "./common/styles/theme.style";

import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./contents/main/Main";

import useUserStore from "./store/user.zustand";
import FirstPage from "./contents/sign/FirstPage";
import Register from "./contents/register/Register";

const AppStyled = styled.div`
  background-color: ${ThemeColor.backgroundColor};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(14px + 2vmin);
  color: white;
  padding-bottom: 10vh;
`;

import authApi from "./api/authApi";

const App = () => {
  /* ===== checking session to get signed or unsigned session ===== */
  authApi.update_session().then((res) => {
    if (res.user_id) console.log(res.user_id, "signed in");
    else console.log("not signed in");
  });

  const user_id = useUserStore((state) => state.user_id);
  const registered = useUserStore((state) => state.registered);

  return (
    <AppStyled>
      <Routes>
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
