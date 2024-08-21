import { useTasksControllerFindAll } from "@/modules/api/default/default";
import { TaskDto } from "@/modules/api/model";
import { useReferralControllerGetReferralLink } from "@/modules/api/referral/referral";
import {
  useTasksControllerClaim,
  useTasksControllerStart,
} from "@/modules/api/tasks/tasks";
import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { useUtils } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";

export const TasksPage = () => {
  const utils = useUtils();

  const { data: linkData, isLoading: isReferralLinkLoading } =
    useReferralControllerGetReferralLink();
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    refetch: refetchTasks,
  } = useTasksControllerFindAll({
    page: 0,
    perPage: 20,
  });

  const { mutateAsync: startTaskMutateAsync } = useTasksControllerStart();
  const { mutateAsync: claimTaskMutateAsync } = useTasksControllerClaim();

  const tasks = tasksData?.data.data;

  useEffect(() => {
    refetchTasks();
  }, []);

  const completeTask = async (task: TaskDto) => {
    if (task.status === "NOT_STARTED") {
      if (task.type === "INVITE_FRIENDS") {
        utils.openTelegramLink(
          "https://t.me/share/url?url=" + linkData?.data.link
        );
      } else if (task.type === "SOCIAL_SUBSCRIPTION") {
        utils.openLink(task.meta?.url || "");
        startTaskMutateAsync({ id: Number(task.id) }).then(() => {
          refetchTasks();
        });
      }
    }

    if (task.status === "READY_FOR_CLAIM") {
      claimTaskMutateAsync({ id: Number(task.id) }).then(() => {
        refetchTasks();
      });
    }
  };

  if (isTasksLoading || isReferralLinkLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Spinner size="l" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center border-blue-500">
      <img src={AmberIcon} alt="$amber" className="h-20 w-20" />
      <p className="mt-2 text-2xl font-bold">Tasks</p>
      <span>Complete tasks and receive rewards</span>

      <ul className="w-full">
        {tasks?.map((task) => {
          const taskTypeClassName =
            task.status === "FINISHED"
              ? "bg-disabled"
              : task.status === "READY_FOR_CLAIM"
                ? "bg-secondary"
                : "bg-primary";

          const taskStatusName =
            task.status === "FINISHED"
              ? "claimed"
              : task.status === "READY_FOR_CLAIM"
                ? "claim"
                : "start";

          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 px-1 py-2 last:border-0"
            >
              <div className="flex items-center gap-1">
                <img src={AmberIcon} alt="$amber" className="h-10 w-10" />

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span>{task.rewardInAmbers}</span>
                </div>
              </div>
              <button
                className={`w-20 rounded-md p-2 ${taskTypeClassName}`}
                onClick={() => completeTask(task)}
              >
                {taskStatusName}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
