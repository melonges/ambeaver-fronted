import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IndexPage = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate(EARN_GAME_PAGE_PATH, { replace: true });
  }, [navigate]);

  return null;
};
