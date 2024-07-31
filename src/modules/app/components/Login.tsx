import { useAssetControllerGetPlayerAssets } from "@/modules/api/asset/asset";
import { useAuthControllerSignIn } from "@/modules/api/authorization/authorization";
import { LayoutProvider } from "@/modules/common/layouts/context";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
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

  const [canFetchAssests, setCanFetchAssests] = useState(false);

  const { status: assetsStatus } = useAssetControllerGetPlayerAssets({
    query: {
      enabled: canFetchAssests,
    },
  });

  const navigate = useNavigate();

  useLayoutEffect(() => {
    login({
      data: { initData: launchParams.initDataRaw || "" },
    }).then(({ data }) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      setCanFetchAssests(true);
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
