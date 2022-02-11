import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  events: [],
};

const savedEventsSlice = createSlice({
  name: "SavedEvents",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events = state.events.concat(action.payload);
    },
    removeEventByTitle(state, action) {
      state.events = state.events.filter(
        (x) => (x.title = action.payload.title)
      );
    },
  },
});

export const getSavedEventsStateSelector = (state) => state.savedEvents;

const savedEventsActions = savedEventsSlice.actions;

export { savedEventsActions, savedEventsSlice };
