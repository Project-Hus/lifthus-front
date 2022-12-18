import React from 'react';
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components';
import { ThemeColor } from './common/styles/theme.style';

const AppStyled = styled.div`
  text-align: center;
  background-color: ${ThemeColor.backgroundColor};
`

function App() {
  return (
    <AppStyled>
      <header className="App-header">
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
          Learn React
        </a>
      </header>
    </AppStyled>
  );
}

export default App;
