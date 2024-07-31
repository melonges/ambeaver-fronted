import AmberIcon from "@/modules/common/assets/amber-icon.png";

export const PropertyPage = () => {
  return (
    <div className="flex flex-col items-center border-purple-500">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="mt-2 text-2xl font-bold">Property</p>

      <div className="mt-8 flex h-32 w-8/12 items-center justify-center rounded-3xl border border-secondary-border bg-secondary text-3xl font-bold">
        SOON
      </div>
    </div>
  );
};
