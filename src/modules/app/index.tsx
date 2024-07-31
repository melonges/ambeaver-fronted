import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SDKProvider } from "@telegram-apps/sdk-react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { BrowserRouter } from "react-router-dom";

import { InitComponent } from "./components/Init";
import "./styles.css";

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SDKProvider acceptCustomStyles debug>
          <InitComponent />
        </SDKProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
