import AmberIcon from "@/modules/common/assets/amber-icon.png";

export const PropertyPage = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="font-bold text-2xl mt-2">Property</p>

      <div className="w-8/12 h-32 mt-8 flex justify-center items-center bg-secondary border border-secondary-border rounded-3xl font-bold text-3xl">
        SOON
      </div>
    </div>
  );
};
