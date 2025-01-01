import { createSlice } from "@reduxjs/toolkit";
import { User } from "./interfaces";

const initialState = {
  user: null as User | null,
  accessToken: null as string | null,
  is_authenticated: false,
  tokenExpiration: null as Date | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      { payload: { user, accessToken, is_authenticated, tokenExpiration } }
    ) {
      localStorage.setItem(
        "@watch_buddy",
        JSON.stringify({ user, accessToken, is_authenticated, tokenExpiration })
      );
      state.user = user;
      state.accessToken = accessToken;
      state.is_authenticated = is_authenticated;
      state.tokenExpiration = tokenExpiration;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.is_authenticated = false;
      state.tokenExpiration = null;
      localStorage.removeItem("@watch_buddy");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
