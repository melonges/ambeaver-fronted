import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "../common/layouts/context";
import { TgProvider } from "../common/telegram/context";
import { RoutesWrapper } from "./routes";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <TgProvider>
        <LayoutProvider>
          <RoutesWrapper />
        </LayoutProvider>
      </TgProvider>
    </BrowserRouter>
  );
};
