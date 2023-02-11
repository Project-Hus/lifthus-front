import React from "react";

import styled from "@emotion/styled";
import { ThemeColor } from "./common/styles/theme.style";

import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./contents/Main";
import Sign from "./contents/sign/Sign";
import SignUp from "./contents/sign/SignUp";
import ErrorPage from "./common/components/ErrorPage";

import useUserStore from "./store/user.zustand";
import FirstPage from "./contents/sign/FirstPage";
import SignIn from "./contents/sign/SignIn";
import Register from "./contents/register/Register";

const AppStyled = styled.section`
  background-color: ${ThemeColor.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  font-size: calc(14px + 2vmin);
  color: white;
  padding-bottom: 10vh;
`;

const App = () => {
  const { t, i18n } = useTranslation();

  const user_id = useUserStore((state) => state.user_id);
  const registered = useUserStore((state) => state.registered);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header></header>
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
          {/* If the user haven't signed in, the user needs to be authenticated */}
          {!user_id && (
            <Route>
              <Route index path="/" element={<FirstPage />} />
              <Route path="/sign/" element={<Sign />} />
              <Route path="/sign/in" element={<SignIn />} />
              <Route path="/sign/up" element={<SignUp />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppStyled>
      <footer></footer>
    </div>
  );
};

export default App;
