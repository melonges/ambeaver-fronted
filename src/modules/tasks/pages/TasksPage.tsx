import { useTasksControllerFindAll } from "@/modules/api/default/default";
import { TaskDto } from "@/modules/api/model";
import { useReferralControllerGetReferralLink } from "@/modules/api/referral/referral";
import {
  useTasksControllerClaim,
  useTasksControllerStart,
} from "@/modules/api/tasks/tasks";
import AmberIcon from "@/modules/common/assets/amber-icon.png";
import { FinishedTaskIcon } from "@/modules/common/icons/FinishedTaskIcon";
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
        <Spinner className="text-[#353B35]" size="l" />
      </div>
    );
  }

  return (
    <div className="text-[#353B35]">
      <h1 className="mt-4 text-3xl font-extrabold">Ambeaver socials</h1>
      <p className="mt-6">
        Join the Ambeaver community, stay up to date with new and upcoming
        updates, find your tribe on Ambeaver
      </p>

      <ul className="mt-1 w-full">
        {tasks?.map((task) => {
          const taskTypeClassName =
            task.status === "FINISHED"
              ? ""
              : task.status === "READY_FOR_CLAIM"
                ? "bg-[#4D824D] text-[#F2F3F2]"
                : "bg-[#353B35] text-[#F2F3F2]";

          const taskStatusName =
            task.status === "FINISHED"
              ? "Claimed"
              : task.status === "READY_FOR_CLAIM"
                ? "Claim"
                : "Start";

          return (
            <li
              key={task.id}
              className="flex w-full items-center justify-between gap-1 border-b-2 py-4 last:border-0"
            >
              <div className="flex items-center gap-5">
                {task.type === "SOCIAL_SUBSCRIPTION" ? (
                  <img
                    src={AmberIcon}
                    alt="$amber"
                    className="h-[35px] w-[35px]"
                  />
                ) : (
                  <div className="h-[35px] w-[35px]" />
                )}

                <div className="flex flex-col">
                  <strong className="font-bold">{task.title}</strong>
                  <span className="font-semibold text-[#3F463FE6]">
                    +{task.rewardInAmbers}AR
                  </span>
                </div>
              </div>
              <button
                className={`w-[65px] rounded-2xl p-2 text-sm ${taskTypeClassName}`}
                onClick={() => completeTask(task)}
              >
                {task.status === "FINISHED" ? (
                  <div className="flex justify-center">
                    <FinishedTaskIcon />
                  </div>
                ) : (
                  taskStatusName
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
