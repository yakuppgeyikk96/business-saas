import { authApi } from "@/services/authApi";
import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: Omit<User, "password"> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.data.token;
          state.isAuthenticated = true;
          state.user = payload.data.user;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.data.token;
          state.isAuthenticated = true;
          state.user = payload.data.user;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user;
        }
      );
  },
});

export default authSlice.reducer;
