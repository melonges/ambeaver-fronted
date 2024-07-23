import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "../common/layouts/context";
import { TgProvider } from "../common/telegram/context";
import { RoutesWrapper } from "./routes";
import "./styles.css";

const queryClient = new QueryClient();

const InitComponent = () => {
  // const tg = useTg();
  // const { mutateAsync, status, error, data } = useAuthControllerSignIn();

  // useLayoutEffect(() => {
  //   mutateAsync({
  //     data: {
  //       initData: tg.initData,
  //     },
  //   }).then(({ data }) => {
  //     console.log({ data });
  //   });
  // }, []);

  return null;
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TgProvider>
          <LayoutProvider>
            <RoutesWrapper />
            <InitComponent />
          </LayoutProvider>
        </TgProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
