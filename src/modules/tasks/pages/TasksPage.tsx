import AmberIcon from "@/modules/common/assets/amber-icon.png";

export const TasksPage = () => {
  return (
    <div className="flex flex-col items-center border-blue-500">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="mt-2 text-2xl font-bold">Tasks</p>
      <span>Complete tasks and receive rewards</span>

      <ul className="w-full">
        {taskList.map((task) => {
          const taskTypeClassName =
            task.type === "claim"
              ? "bg-secondary"
              : task.type === "claimed"
                ? "bg-disabled"
                : "bg-primary";
          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 px-1 py-2 last:border-0"
            >
              <div className="flex items-center gap-1">
                <img src={AmberIcon} alt="$amber" className="h-10 w-10" />

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span>{task.reward}</span>
                </div>
              </div>
              <button className={`w-20 rounded-md p-2 ${taskTypeClassName}`}>
                {task.type}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="w-full">
        {taskList.map((task) => {
          const taskTypeClassName =
            task.type === "claim"
              ? "bg-secondary"
              : task.type === "claimed"
                ? "bg-disabled"
                : "bg-primary";
          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 px-1 py-2 last:border-0"
            >
              <div className="flex items-center gap-1">
                <img src={AmberIcon} alt="$amber" className="h-10 w-10" />

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span>{task.reward}</span>
                </div>
              </div>
              <button className={`w-20 rounded-md p-2 ${taskTypeClassName}`}>
                {task.type}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="w-full">
        {taskList.map((task) => {
          const taskTypeClassName =
            task.type === "claim"
              ? "bg-secondary"
              : task.type === "claimed"
                ? "bg-disabled"
                : "bg-primary";
          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 px-1 py-2 last:border-0"
            >
              <div className="flex items-center gap-1">
                <img src={AmberIcon} alt="$amber" className="h-10 w-10" />

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span>{task.reward}</span>
                </div>
              </div>
              <button className={`w-20 rounded-md p-2 ${taskTypeClassName}`}>
                {task.type}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="w-full">
        {taskList.map((task) => {
          const taskTypeClassName =
            task.type === "claim"
              ? "bg-secondary"
              : task.type === "claimed"
                ? "bg-disabled"
                : "bg-primary";
          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 px-1 py-2 last:border-0"
            >
              <div className="flex items-center gap-1">
                <img src={AmberIcon} alt="$amber" className="h-10 w-10" />

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span>{task.reward}</span>
                </div>
              </div>
              <button className={`w-20 rounded-md p-2 ${taskTypeClassName}`}>
                {task.type}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const taskList = [
  {
    id: 1,
    title: "Welcome to Business, beavers",
    reward: "+2000 AR",
    type: "claim",
  },
  {
    id: 2,
    title: "Invite 1 fren",
    reward: "+1000 AR",
    type: "start",
  },
  {
    id: 3,
    title: "Subscribe to AmbeaveR Telegram",
    reward: "+500 AR",
    type: "start",
  },
  {
    id: 4,
    title: "Follow AmbeaveR on Instagram",
    reward: "+500 AR",
    type: "claim",
  },
  {
    id: 5,
    title: "Follow AmbeaveR on X",
    reward: "+500 AR",
    type: "claimed",
  },
  {
    id: 6,
    title: "Join AmbeaveR Discord",
    reward: "+500 AR",
    type: "claimed",
  },
];
