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
  height: 100v%;
  font-size: calc(14px + 2vmin);
  color: white;
  padding-bottom: 10vh;
`;

const App = () => {
  const user_id = useUserStore((state) => state.user_id);
  const registered = useUserStore((state) => state.registered);

  return (
    <div style={{ backgroundColor: ThemeColor.backgroundColor }}>
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
    </div>
  );
};

export default App;
