import { baseApi } from "../baseApi";
import { AuthResponse } from "./types/AuthResponse";
import { LoginRequest } from "./types/LoginRequest";
import { RegisterRequest } from "./types/RegisterRequest";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data: result } = await queryFulfilled;

          localStorage.setItem("token", result.data.token);
        } catch {
          /* empty */
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data: result } = await queryFulfilled;

          localStorage.setItem("token", result.data.token);
        } catch {
          /* empty */
        }
      },
    }),

    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => "auth/me",
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;

          localStorage.removeItem("token");
        } catch {
          /* empty */
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
