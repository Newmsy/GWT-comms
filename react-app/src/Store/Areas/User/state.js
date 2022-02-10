import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userId: "",
  emailAddress: "",
  loading: false,
  fetched: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchUser(state) {
      state.loading = true;
    },
    fetchUserIdSuccess(state, action) {
      state.loading = false;
      state.fetched = true;
      state.userId = action.payload.userId;
    },
  },
});

export const userStateSelector = (state) => state.user;

const userActions = userSlice.actions;

export { userActions, userSlice };
