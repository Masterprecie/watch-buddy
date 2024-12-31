import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utils/baseQuery";
import {
  IResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./interfaces";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, RegisterPayload>({
      query: (credentials) => ({
        url: `/api/register`,
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: `/api/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
