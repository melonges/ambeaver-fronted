/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Ambeaver API
 * OpenAPI spec version: 0.0.1
 */
import type {
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as axios from "axios";
import type {
  CreateTaskDto,
  TasksControllerFindAll200,
  TasksControllerFindAllParams,
  UpdateTaskDto,
} from ".././model";

export const tasksControllerCreate = (
  createTaskDto: CreateTaskDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<CreateTaskDto>> => {
  return axios.default.post(`/tasks`, createTaskDto, options);
};

export const getTasksControllerCreateMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerCreate>>,
    TError,
    { data: CreateTaskDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof tasksControllerCreate>>,
  TError,
  { data: CreateTaskDto },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof tasksControllerCreate>>,
    { data: CreateTaskDto }
  > = (props) => {
    const { data } = props ?? {};

    return tasksControllerCreate(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TasksControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerCreate>>
>;
export type TasksControllerCreateMutationBody = CreateTaskDto;
export type TasksControllerCreateMutationError = AxiosError<unknown>;

export const useTasksControllerCreate = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerCreate>>,
    TError,
    { data: CreateTaskDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof tasksControllerCreate>>,
  TError,
  { data: CreateTaskDto },
  TContext
> => {
  const mutationOptions = getTasksControllerCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const tasksControllerFindAll = (
  params: TasksControllerFindAllParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<TasksControllerFindAll200>> => {
  return axios.default.get(`/tasks`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getTasksControllerFindAllQueryKey = (
  params: TasksControllerFindAllParams
) => {
  return [`/tasks`, ...(params ? [params] : [])] as const;
};

export const getTasksControllerFindAllInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof tasksControllerFindAll>>>,
  TError = AxiosError<unknown>,
>(
  params: TasksControllerFindAllParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindAll>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTasksControllerFindAllQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tasksControllerFindAll>>
  > = ({ signal }) =>
    tasksControllerFindAll(params, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof tasksControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TasksControllerFindAllInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerFindAll>>
>;
export type TasksControllerFindAllInfiniteQueryError = AxiosError<unknown>;

export const useTasksControllerFindAllInfinite = <
  TData = InfiniteData<Awaited<ReturnType<typeof tasksControllerFindAll>>>,
  TError = AxiosError<unknown>,
>(
  params: TasksControllerFindAllParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindAll>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTasksControllerFindAllInfiniteQueryOptions(
    params,
    options
  );

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getTasksControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof tasksControllerFindAll>>,
  TError = AxiosError<unknown>,
>(
  params: TasksControllerFindAllParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindAll>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTasksControllerFindAllQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tasksControllerFindAll>>
  > = ({ signal }) =>
    tasksControllerFindAll(params, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof tasksControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TasksControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerFindAll>>
>;
export type TasksControllerFindAllQueryError = AxiosError<unknown>;

export const useTasksControllerFindAll = <
  TData = Awaited<ReturnType<typeof tasksControllerFindAll>>,
  TError = AxiosError<unknown>,
>(
  params: TasksControllerFindAllParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindAll>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTasksControllerFindAllQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const tasksControllerFindOne = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<string>> => {
  return axios.default.get(`/tasks/${id}`, options);
};

export const getTasksControllerFindOneQueryKey = (id: string) => {
  return [`/tasks/${id}`] as const;
};

export const getTasksControllerFindOneInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof tasksControllerFindOne>>>,
  TError = AxiosError<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindOne>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTasksControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tasksControllerFindOne>>
  > = ({ signal }) => tasksControllerFindOne(id, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    staleTime: 10000,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof tasksControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TasksControllerFindOneInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerFindOne>>
>;
export type TasksControllerFindOneInfiniteQueryError = AxiosError<unknown>;

export const useTasksControllerFindOneInfinite = <
  TData = InfiniteData<Awaited<ReturnType<typeof tasksControllerFindOne>>>,
  TError = AxiosError<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindOne>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTasksControllerFindOneInfiniteQueryOptions(
    id,
    options
  );

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getTasksControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof tasksControllerFindOne>>,
  TError = AxiosError<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindOne>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTasksControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tasksControllerFindOne>>
  > = ({ signal }) => tasksControllerFindOne(id, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof tasksControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TasksControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerFindOne>>
>;
export type TasksControllerFindOneQueryError = AxiosError<unknown>;

export const useTasksControllerFindOne = <
  TData = Awaited<ReturnType<typeof tasksControllerFindOne>>,
  TError = AxiosError<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tasksControllerFindOne>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTasksControllerFindOneQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const tasksControllerUpdate = (
  id: string,
  updateTaskDto: UpdateTaskDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<string>> => {
  return axios.default.patch(`/tasks/${id}`, updateTaskDto, options);
};

export const getTasksControllerUpdateMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerUpdate>>,
    TError,
    { id: string; data: UpdateTaskDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof tasksControllerUpdate>>,
  TError,
  { id: string; data: UpdateTaskDto },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof tasksControllerUpdate>>,
    { id: string; data: UpdateTaskDto }
  > = (props) => {
    const { id, data } = props ?? {};

    return tasksControllerUpdate(id, data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TasksControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerUpdate>>
>;
export type TasksControllerUpdateMutationBody = UpdateTaskDto;
export type TasksControllerUpdateMutationError = AxiosError<unknown>;

export const useTasksControllerUpdate = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerUpdate>>,
    TError,
    { id: string; data: UpdateTaskDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof tasksControllerUpdate>>,
  TError,
  { id: string; data: UpdateTaskDto },
  TContext
> => {
  const mutationOptions = getTasksControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const tasksControllerRemove = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<string>> => {
  return axios.default.delete(`/tasks/${id}`, options);
};

export const getTasksControllerRemoveMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof tasksControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof tasksControllerRemove>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return tasksControllerRemove(id, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TasksControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof tasksControllerRemove>>
>;

export type TasksControllerRemoveMutationError = AxiosError<unknown>;

export const useTasksControllerRemove = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tasksControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof tasksControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = getTasksControllerRemoveMutationOptions(options);

  return useMutation(mutationOptions);
};
