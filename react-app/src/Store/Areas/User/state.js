import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
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
    },
    signIn(state, action) {
      state.loadingSignIn = true;
      state.name = action.payload.name;
      state.isSignedIn = true;
      state.loadingSignIn = false;
    },
    signInSuccess(state, action) {
      state.name = action.payload.name;
      state.isSignedIn = true;
      state.loadingSignIn = false;
      console.log("success");
    },
    signOut(state) {
      state.name = undefined;
      state.isSignedIn = false;
      state.loadingSignIn = false;
    },
  },
});

export const userStateSelector = (state) => state.user;

const userActions = userSlice.actions;

export { userActions, userSlice };
