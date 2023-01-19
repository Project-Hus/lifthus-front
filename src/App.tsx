import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";
import { ThemeColor } from "./common/styles/theme.style";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import Main from "./contents/main/Main";
import Sign from "./contents/sign/Sign";
import SignUp from "./contents/sign/SignUp";
import ErrorPage from "./common/components/ErrorPage";

import useAppStore from "./store/app.zustand";
import FirstPage from "./contents/sign/FirstPage";
import SignIn from "./contents/sign/SignIn";

const AppStyled = styled.section`
  background-color: ${ThemeColor.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(14px + 2vmin);
  color: white;
  padding-bottom: 10vh;
`;

const App = () => {
  const { t, i18n } = useTranslation();

  const user_id = useAppStore((state) => state.user_id);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header></header>
      <AppStyled>
        <Routes>
          {/* If the user has signed in, Let the Main component take control. */}
          {user_id && <Route path="*" element={<Main />} />}
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
