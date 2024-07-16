import AmberIcon from "@/modules/common/assets/amber-icon.png";

export const FrinedsPage = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="font-bold text-2xl mt-2">Ur friends-beavers</p>
      <span>Invite friends and receive ambers.</span>

      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className="bg-primary flex p-4 justify-center items-center rounded text-center">
          5,000 for fren
        </div>

        <div className="bg-primary flex p-4 justify-center items-center rounded text-center">
          10,000 for fren <br /> with telegram premium
        </div>
      </div>

      <div className="mt-4 w-full flex justify-between px-6 items-center">
        <p>List of your frineds</p>
        <button className="bg-primary py-2 px-4 rounded">refresh</button>
      </div>

      <div className="mt-4 bg-primary h-32 w-full text-center flex items-center justify-center rounded">
        invitations
      </div>

      <button className="mt-4 bg-primary p-2 w-full rounded">
        INVITE A FRIEND
      </button>
    </div>
  );
};
