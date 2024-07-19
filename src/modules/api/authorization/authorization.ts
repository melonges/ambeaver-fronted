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
import type { AccessTokenDto, TelegramInitDataDto } from ".././model";

export const authControllerSignIn = (
  telegramInitDataDto: TelegramInitDataDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<AccessTokenDto>> => {
  return axios.default.post(`/auth/login`, telegramInitDataDto, options);
};

export const getAuthControllerSignInMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerSignIn>>,
    TError,
    { data: TelegramInitDataDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerSignIn>>,
  TError,
  { data: TelegramInitDataDto },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerSignIn>>,
    { data: TelegramInitDataDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerSignIn(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerSignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;
export type AuthControllerSignInMutationBody = TelegramInitDataDto;
export type AuthControllerSignInMutationError = AxiosError<void>;

export const useAuthControllerSignIn = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerSignIn>>,
    TError,
    { data: TelegramInitDataDto },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerSignIn>>,
  TError,
  { data: TelegramInitDataDto },
  TContext
> => {
  const mutationOptions = getAuthControllerSignInMutationOptions(options);

  return useMutation(mutationOptions);
};
