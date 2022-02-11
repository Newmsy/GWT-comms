import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isVisible: false,
  text: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    displayToast(state, action) {
      state.isVisible = true;
      state.text = action.payload.message;
    },
    hideToast(state) {
      state.isVisible = false;
    },
    closeToast(state) {
      state.isVisible = false;
      state.text = "";
    },
    closeToastByMessage(state, action) {
      if (action.payload.message === state.text) {
        state.isVisible = false;
        state.text = "";
      }
    },
  },
});

const toastActions = toastSlice.actions;

export { toastActions, toastSlice };
