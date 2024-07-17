import StumpImage from "@/modules/common/assets/stump.png";
import { STORE_PAGE_PATH } from "@/modules/store/routes/constants";
import { Link } from "react-router-dom";

export const OverEnergyArea = () => {
  return (
    <div className="h-full flex flex-col justify-between items-center py-4">
      <div className="w-8/12">
        <p className="bg-secondary p-2 rounded border-2 border-secondary-border">
          click limit is over you can restore it and play more
        </p>
        <Link
          to={STORE_PAGE_PATH}
          className="text-white border-2 border-secondary-darken-broder bg-secondary-darken rounded py-2 px-4 -mt-4"
        >
          spend 12 ⚡
        </Link>
      </div>

      <img className="w-1/2" src={StumpImage} alt="stump" />
    </div>
  );
};
