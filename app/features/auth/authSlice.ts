import { createSlice } from "@reduxjs/toolkit";
import { User } from "./interfaces";

const initialState = {
  user: null as User | null,
  accessToken: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, { payload: { user, accessToken } }) {
      localStorage.setItem(
        "@watch_buddy",
        JSON.stringify({ user, accessToken })
      );
      state.user = user;
      state.accessToken = user.accessToken;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("@watch_buddy");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
