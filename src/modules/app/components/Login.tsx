import { useAssetsControllerGetPlayerAssets } from "@/modules/api/assets/assets";
import { useAuthControllerSignIn } from "@/modules/api/authorization/authorization";
import { useSettingsControllerFindOne } from "@/modules/api/settings/settings";
import { LayoutProvider } from "@/modules/common/layouts/context";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesWrapper, UN_AUTHORIZED_PAGE_PATH } from "../routes";
import { Loader } from "./Loader";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

export const Login = () => {
  const launchParams = useLaunchParams();

  const {
    mutateAsync: login,
    error: loginError,
    status: loginStatus,
  } = useAuthControllerSignIn();

  const { status: assetsStatus, refetch: assetsRefetch } =
    useAssetsControllerGetPlayerAssets({
      query: {
        enabled: false,
      },
    });

  const { status: settingsStatus, refetch: settingsRefetch } =
    useSettingsControllerFindOne({
      query: {
        enabled: false,
      },
    });

  const navigate = useNavigate();

  useLayoutEffect(() => {
    login({
      data: { initData: launchParams.initDataRaw || "" },
    }).then(({ data }) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      assetsRefetch();
      settingsRefetch();
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
  }, [loginError, assetsStatus, settingsStatus]);

  if (
    !loginError &&
    (loginStatus === "pending" ||
      assetsStatus === "pending" ||
      settingsStatus === "pending")
  ) {
    return <Loader />;
  }

  return (
    <LayoutProvider>
      <RoutesWrapper />
    </LayoutProvider>
  );
};
