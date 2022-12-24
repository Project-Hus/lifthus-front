import React from "react";
import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";
import { ThemeColor } from "./common/styles/theme.style";

import { useTranslation } from "react-i18next";

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
  return (
    <AppStyled>
      <header></header>
      <section>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Work out!")}
        </a>
      </section>
      <footer></footer>
    </AppStyled>
  );
}

export default App;
