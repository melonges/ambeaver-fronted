import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTg } from "./useTg";

export const useBackButton = () => {
  const tg = useTg();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => navigate(-1);

    tg.BackButton.show();
    tg.BackButton.onClick(handler);

    return () => {
      tg.BackButton.offClick(handler);
      tg.BackButton.hide();
    };
  }, []);
};
