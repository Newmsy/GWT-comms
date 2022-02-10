import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userId: undefined,
  emailAddress: "",
  loading: false,
  fetched: false,
  isSignedIn: false,
  loadingSignIn: false,
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
    signIn(state) {
      state.loadingSignIn = true;
    },
    signInSuccess(state, action) {
      state.userId = action.payload.userId;
      state.emailAddress = action.payload.emailAddress;
      state.isSignedIn = true;
      state.loadingSignIn = false;
      console.log("success");
    },
    signOut(state) {
      state.userId = undefined;
      state.emailAddress = undefined;
      state.isSignedIn = false;
      state.loadingSignIn = false;
    },
  },
});

export const userStateSelector = (state) => state.user;

const userActions = userSlice.actions;

export { userActions, userSlice };
