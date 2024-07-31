import { useLaunchParams } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Login } from "./Login";

export const InitComponent = () => {
  const lp = useLaunchParams();

  return (
    <AppRoot
      // appearance={miniApp.isDark ? "dark" : "light"}
      appearance="light"
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <Login />
    </AppRoot>
  );
};
