import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

import "./i18n";

import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./common/styles/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import statusInfo from "./api/interfaces/statusInfo.json";

import axios from "axios";

const queryClient = new QueryClient();

/* ===== checking session to get access token ===== */
axios
  .post(
    process.env.REACT_APP_LIFTHUS_AUTH_URL + "/session/new",
    {},
    {
      withCredentials: true,
    }
  )
  .then(async (res) => {
    if (res.status === statusInfo.succ.Created.code) {
      const sid = res.data;
      // client will get new sid from lifthus/session/new,
      // then client will send the sid to Hus auth server.
      // and if Hus responds Unauthorized, client will stay unsigned in.
      // or else, Hus tells Lifthus that the user is signed in.
      // then Lifthus will set the login session and tells Ok to Hus.
      // Hus got Ok, now Hus tells the client Ok.
      // and finally, the client requests access token from Lifthus and Lifthus revokes the sessoin.
      // after the access token is expired, the process will be repeated.
      try {
        res = await axios.post(
          process.env.REACT_APP_HUS_AUTH_URL + "/session/check/lifthus/" + sid,
          {},
          { withCredentials: true }
        );
        res = await axios.post(
          process.env.REACT_APP_LIFTHUS_AUTH_URL + "/session/access",
          {},
          { withCredentials: true }
        );
      } catch (e) {
        console.log(e);
      }
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
