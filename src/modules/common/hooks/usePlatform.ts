import { useLaunchParams } from "@telegram-apps/sdk-react";

export const usePlatform = () => {
  const launchParams = useLaunchParams();
  return ["macos", "ios"].includes(launchParams.platform) ? "ios" : "base";
};
