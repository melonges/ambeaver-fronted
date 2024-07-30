import { useLayout } from "@/modules/common/layouts/useLayout";
import { useLocation } from "react-router-dom";

export const UnAuthorizedPage = () => {
  useLayout("empty");

  const { state } = useLocation();

  return (
    <div className="flex h-full flex-col items-center justify-center font-bold">
      {state?.errorMessage}
    </div>
  );
};
