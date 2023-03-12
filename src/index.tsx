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

/* ===== checking lifthus-session ===== */
axios
  .post(
    process.env.REACT_APP_LIFTHUS_API_URL + "/user/session/new",
    {},
    { withCredentials: true }
  )
  .then(async (res) => {
    if (res.status === statusInfo.succ.Ok.code) {
      const sid = res.data;
      // post request below requests check from Hus.
      // and if it's valid, Hus tells it to Lifthus.
      // after Litfhus responds, Hus redirects client to Lifthus endpoint.
      // Lifthus noticed Hus session and by sid in cookie,
      // Lifthus sets refresh token and access token to cookie.
      await axios.post(
        process.env.REACT_APP_HUS_AUTH_URL + "/session/check/lifthus/" + sid,
        {},
        { withCredentials: true }
      );
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
