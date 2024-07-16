import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "../common/layouts/context";
import { RoutesWrapper } from "./routes";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <RoutesWrapper />
      </LayoutProvider>
    </BrowserRouter>
  );
};
