import styled from "@emotion/styled";
import { ThemeColor } from "./common/styles/theme.style";

import useUserStore from "./store/user.zustand";

import authApi from "./api/authApi";
import userApi from "./api/userApi";
import { LIFTHUS_ERR_URL } from "./common/routes";
import { SessionUserInfo } from "./api/interfaces/authApi.interface";
import { axiosInterceptorSetter } from "./api/axios.interceptor";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import Pending from "./pages/pending/Pending";
import Main from "./pages/Main";
import Register from "./pages/register/Register";
import WelcomePage from "./pages/sign/WelcomePage";
import ErrorPage from "./pages/error/ErrorPage";
import Sign from "./pages/sign/Sign";

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
  axiosInterceptorSetter();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  /* ===== automatic SSO ===== */
  const isErrorPage = window.location.href.startsWith(LIFTHUS_ERR_URL);
  const { isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await authApi.updateSession();
      const user: SessionUserInfo | undefined = res.user;
      if (!!user) {
        const userInfo = await userApi.getUserInfo({ uid: user.uid });
        setUserInfo(userInfo);
        console.log(userInfo, "user signed");
      }
      return res;
    },
    refetchOnWindowFocus: false,
    enabled: !isErrorPage,
  });

  const uid = useUserStore((state) => state.uid);
  const registered = useUserStore((state) => state.registered);

  return isLoading ? (
    <AppStyled>
      <Routes>
        <Route path="/*" element={<Pending />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </AppStyled>
  ) : (
    <AppStyled>
      <Routes>
        <Route path="/pending/*" element={<Pending />} />
        {/* user not signed or user signed and registered */}
        {(!uid || (uid && registered)) && (
          <Route path="/*" element={<Main />} />
        )}
        {/* If the user has signed but not registered, the user have to register themselves */}
        {uid && !registered && (
          <Route>
            <Route path="/" element={<Navigate to="/register/" />} />
            <Route path="/register/*" element={<Register />} />
          </Route>
        )}
        <Route>
          <Route path="/welcome" element={<WelcomePage />} />
          {!uid && <Route path="/sign/*" element={<Sign />} />}
        </Route>

        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Pending />} />
      </Routes>
    </AppStyled>
  );
};

export default App;
