import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  fetched: false,
  tickets: [],
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
      state.tickets = action.payload.tickets;
    },
  },
});

export const getEventsStateSelector = (state) => state.events;

const getEventsActions = getEventsSlice.actions;

export { getEventsActions, getEventsSlice };
