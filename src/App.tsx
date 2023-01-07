import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";
import { ThemeColor } from "./common/styles/theme.style";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Main from "./contents/main/containers/Main";

const AppStyled = styled.div`
  text-align: center;
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

function App() {
  const { t, i18n } = useTranslation();

  const userId = useState(undefined);
  return (
    <AppStyled>
      <header></header>
      <section>
        <Routes>
          <Route path="/*" element={<Main />} />
          {userId === undefined && (
            <Route>
              <Route path="/register/*" element={<div />} />
              <Route path="/sign" element={<div />} />
              <Route path="/signin" element={<div />} />
              <Route path="/signin/up" element={<div />} />
            </Route>
          )}
        </Routes>
      </section>
      <footer></footer>
    </AppStyled>
  );
}

export default App;
