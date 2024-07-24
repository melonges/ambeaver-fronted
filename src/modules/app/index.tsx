import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useAssetControllerGetPlayerAssets } from "../api/asset/asset";
import { useAuthControllerSignIn } from "../api/authorization/authorization";
import { LayoutProvider } from "../common/layouts/context";
import { TgProvider } from "../common/telegram/context";
import { useTg } from "../common/telegram/useTg";
import { Loader } from "./components/Loader";
import { RoutesWrapper, UN_AUTHORIZED_PAGE_PATH } from "./routes";
import "./styles.css";

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

const InitComponent = () => {
  const tg = useTg();
  const {
    mutateAsync: login,
    error: loginError,
    status: loginStatus,
  } = useAuthControllerSignIn();

  const { status: assetsStatus } = useAssetControllerGetPlayerAssets();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    login({
      data: {
        initData: tg.initData,
      },
    }).then(({ data }) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    });
  }, []);

  useEffect(() => {
    if (loginError) {
      const errorServerData = loginError?.response?.data as unknown as
        | { message: string }
        | undefined;

      navigate(UN_AUTHORIZED_PAGE_PATH, {
        state: {
          errorMessage:
            errorServerData?.message ||
            "Не удалось авторизоваться " + loginError?.message,
        },
      });
    }
  }, [loginError]);

  if (loginStatus === "pending" || assetsStatus === "pending") {
    return <Loader />;
  }

  return (
    <LayoutProvider>
      <RoutesWrapper />
    </LayoutProvider>
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TgProvider>
          <InitComponent />
        </TgProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
