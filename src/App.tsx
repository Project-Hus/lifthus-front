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
import {
  HUS_AUTH_URL,
  LIFTHUS_ERR_URL,
  LIFTHUS_SESSION_URL,
} from "./common/routes";
import {
  SessionCreated,
  SessionUserInfo,
} from "./api/interfaces/authApi.interface";
import ErrorPage from "./pages/error/ErrorPage";
import axios from "axios";
import { refreshLst } from "./api/axios.interceptor";

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
  const currentURL = window.location.href;
  if (!currentURL.startsWith(LIFTHUS_ERR_URL)) {
    authApi.updateSession().then(async (res) => {
      const user: SessionUserInfo | undefined = res.user;
      if (!!user) {
        const userInfo = await userApi.getUserInfo({ uid: Number(user.uid) });
        setUserInfo(userInfo);
        console.log(userInfo, "user signed");
      } else console.log("not signed");
    });
  }

  // request interceptor adding lst to Authorization header
  axios.interceptors.request.use((config) => {
    if (!config.headers) return config;

    let lst = localStorage.getItem("lifthus_st");

    if (lst !== null) {
      config.headers.Authorization = lst;
    }
    return config;
  });

  // response interceptor handling lst expiration
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log("WHY!!!!!!!!!!!!!!!!");
      const {
        config,
        response: { status, data: msg },
      } = err;
      if (
        config.url === LIFTHUS_SESSION_URL || // previous request was to refresh.
        status != 401 ||
        msg != "expired_token" || // response is not expiration error.
        config.sent // already sent.
      ) {
        return Promise.reject(err); // just pass the error through.
      }
      config.sent = true; // mark the request as sent.

      const lst = await refreshLst();

      if (lst) {
        config.headers.Authorization = lst;
        return axios(config);
      }
      return Promise.reject(err);
    }
  );

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
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Pending />} />
      </Routes>
    </AppStyled>
  );
};

export default App;
