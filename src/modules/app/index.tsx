import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useAuthControllerSignIn } from "../api/authorization/authorization";
import { LayoutProvider } from "../common/layouts/context";
import { TgProvider } from "../common/telegram/context";
import { useTg } from "../common/telegram/useTg";
import { RoutesWrapper, UN_AUTHORIZED_PAGE_PATH } from "./routes";
import "./styles.css";

const queryClient = new QueryClient();

const InitComponent = () => {
  const tg = useTg();
  const { mutateAsync, error } = useAuthControllerSignIn();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    mutateAsync({
      data: {
        initData: tg.initData,
      },
    }).then(({ data }) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    });
  }, []);

  useEffect(() => {
    if (error) {
      const errorServerData = error?.response?.data as unknown as
        | { message: string }
        | undefined;

      navigate(UN_AUTHORIZED_PAGE_PATH, {
        state: {
          errorMessage:
            errorServerData?.message ||
            "Не удалось авторизоваться " + error?.message,
        },
      });
    }
  }, [error]);

  return null;
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TgProvider>
          <InitComponent />
          <LayoutProvider>
            <RoutesWrapper />
          </LayoutProvider>
        </TgProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
