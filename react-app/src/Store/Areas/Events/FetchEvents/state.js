import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userId: "",
  emailAddress: "",
  loading: false,
  fetched: false,
  events: [],
  viewDate: new Date(),
};

const getEventsSlice = createSlice({
  name: "GetEvents",
  initialState,
  reducers: {
    fetchEvents(state) {
      state.loading = true;
    },
    fetchEventsSuccess(state, action) {
      console.log("success");
      state.loading = false;
      state.fetched = true;
      state.events = action.payload.events;
    },
    setViewDate(state, action) {
      state.viewDate = action.payload;
    },
  },
});

export const getEventsStateSelector = (state) => state.events;

const getEventsActions = getEventsSlice.actions;

export { getEventsActions, getEventsSlice };
