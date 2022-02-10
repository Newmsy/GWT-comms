import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userId: "",
  emailAddress: "",
  loading: false,
  fetched: false,
  events: {},
};

const getEventsSlice = createSlice({
  name: "GetEvents",
  initialState,
  reducers: {
    fetchEvents(state) {
      state.loading = true;
    },
    fetchEventsSuccess(state, action) {
      state.loading = false;
      state.fetched = true;
      state.events = action.payload.events;
    },
  },
});

export const getEventsStateSelector = (state) => state.events;

const getEventsActions = getEventsSlice.actions;

export { getEventsActions, getEventsSlice };
