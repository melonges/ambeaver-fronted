import { Spinner } from "@telegram-apps/telegram-ui";

export const Loader = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center font-bold">
      <Spinner className="text-[#353B35]" size="l" />
    </div>
  );
};
