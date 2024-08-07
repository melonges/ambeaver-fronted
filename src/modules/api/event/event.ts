/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Ambeaver API
 * OpenAPI spec version: 0.0.1
 */
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as axios from "axios";
import type { TapEventDto } from ".././model";

export const eventControllerTap = (
  tapEventDto: TapEventDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.default.patch(`/event/tap`, tapEventDto, options);
};

export const getEventControllerTapMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof eventControllerTap>>,
    TError,
    { data: TapEventDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof eventControllerTap>>,
  TError,
  { data: TapEventDto },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof eventControllerTap>>,
    { data: TapEventDto }
  > = (props) => {
    const { data } = props ?? {};

    return eventControllerTap(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type EventControllerTapMutationResult = NonNullable<
  Awaited<ReturnType<typeof eventControllerTap>>
>;
export type EventControllerTapMutationBody = TapEventDto;
export type EventControllerTapMutationError = AxiosError<unknown>;

export const useEventControllerTap = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof eventControllerTap>>,
    TError,
    { data: TapEventDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof eventControllerTap>>,
  TError,
  { data: TapEventDto },
  TContext
> => {
  const mutationOptions = getEventControllerTapMutationOptions(options);

  return useMutation(mutationOptions);
};
