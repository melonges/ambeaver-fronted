import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useShowBackButton = () => {
  const bb = useBackButton();

  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => navigate(EARN_GAME_PAGE_PATH);

    bb.show();
    bb.on("click", handler);

    return () => {
      bb.off("click", handler);
      bb.hide();
    };
  }, []);
};
