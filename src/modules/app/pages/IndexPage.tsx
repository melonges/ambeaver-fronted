import { EARN_GAME_PAGE_PATH } from "@/modules/earn-game/routes/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(EARN_GAME_PAGE_PATH);
  }, []);

  return null;
};
