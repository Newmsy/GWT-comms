import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
};

const createEventsSlice = createSlice({
  name: "CreateEvent",
  initialState,
  reducers: {
    createEvent(state) {
      state.loading = true;
    },
    createEventSuccess(state, action) {
      state.loading = false;
    },
  },
});

export const createEventStateSelector = (state) => state.createEvent;

const createEventActions = createEventsSlice.actions;

export { createEventActions, createEventsSlice };
