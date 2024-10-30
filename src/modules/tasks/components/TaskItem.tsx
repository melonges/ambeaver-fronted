import { getTasksControllerFindAllQueryKey } from "@/modules/api/default/default";
import {
  TaskDto,
  TaskDtoStatus,
  TasksControllerFindAll200,
} from "@/modules/api/model";
import {
  useTasksControllerClaim,
  useTasksControllerStart,
} from "@/modules/api/tasks/tasks";
import { FinishedTaskIcon } from "@/modules/common/icons/FinishedTaskIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useHapticFeedback, useUtils } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { tasksParams } from "../pages/TasksPage";

export const TaskItem = ({
  inviteLink,
  task,
  refetchTasks,
}: {
  inviteLink: string;
  task: TaskDto;
  refetchTasks: () => void;
}) => {
  const utils = useUtils();
  const hapticFeedback = useHapticFeedback();

  const queryClient = useQueryClient();

  const onSuccess = useCallback(
    (successData: any, status: TaskDtoStatus) => {
      refetchTasks();

      queryClient.setQueryData(
        getTasksControllerFindAllQueryKey(tasksParams),
        (untypedData) => {
          const data = untypedData as
            | AxiosResponse<TasksControllerFindAll200, any>
            | undefined;

          if (data?.data.data !== undefined) {
            return {
              ...data,

              data: {
                ...data.data,
                data: data.data.data.map((item) => {
                  if (item.id === successData?.data?.task?.id) {
                    return {
                      ...item,
                      status,
                    };
                  }
                  return item;
                }),
              },
            };
          }

          return data;
        }
      );
    },
    [queryClient, task]
  );

  const { mutateAsync: startTaskMutateAsync, isPending: isStartTaskPending } =
    useTasksControllerStart({
      mutation: {
        onSuccess: (data) => onSuccess(data, TaskDtoStatus.READY_FOR_CLAIM),
      },
    });
  const { mutateAsync: claimTaskMutateAsync, isPending: isClaimTaskPending } =
    useTasksControllerClaim({
      mutation: {
        onSuccess: (data) => onSuccess(data, TaskDtoStatus.FINISHED),
      },
    });

  const isLoading = isStartTaskPending || isClaimTaskPending;

  const taskTypeClassName = isLoading
    ? "bg-active"
    : task.status === "FINISHED"
      ? ""
      : task.status === "READY_FOR_CLAIM"
        ? "bg-[#4D824D] text-white-bg"
        : "bg-active text-white-bg dark:text-[#111311] dark:bg-white-bg";

  const taskStatusName =
    task.status === "FINISHED"
      ? "Claimed"
      : task.status === "READY_FOR_CLAIM"
        ? "Claim"
        : "Start";

  const completeTask = async () => {
    if (task.status === "NOT_STARTED") {
      if (task.type === "INVITE_FRIENDS") {
        utils.openTelegramLink("https://t.me/share/url?url=" + inviteLink);
      } else if (task.type === "SOCIAL_SUBSCRIPTION") {
        utils.openLink(task.meta?.url || "");
        startTaskMutateAsync({ id: Number(task.id) }).then(() => {});
      }
    }

    if (task.status === "READY_FOR_CLAIM") {
      hapticFeedback.impactOccurred("soft");
      claimTaskMutateAsync({ id: Number(task.id) });
    }
  };

  return (
    <li className="flex w-full items-center justify-between gap-1 border-b-2 py-4 last:border-0 dark:border-[#2b312b]">
      <div className="flex items-center gap-5">
        <img src={task.icon} alt="task-icon" />

        <div className="flex flex-col">
          <strong className="font-bold">{task.title}</strong>
          <span className="font-semibold text-faded text-opacity-90 dark:text-[#C7CCC7] dark:text-opacity-100">
            +{task.rewardInAmbers}AR
          </span>
        </div>
      </div>
      <button
        className={`flex h-[35px] w-[65px] min-w-[65px] max-w-[65px] items-center justify-center rounded-[18px] px-2 text-sm ${taskTypeClassName}`}
        onClick={completeTask}
      >
        {task.status === "FINISHED" ? (
          <div className="flex justify-center">
            <FinishedTaskIcon />
          </div>
        ) : isLoading ? (
          <Spinner className="text-secondary-white" size="s" />
        ) : (
          <span className="font-medium">{taskStatusName}</span>
        )}
      </button>
    </li>
  );
};
