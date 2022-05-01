import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  events: [],
};

const SavedTicketsSlice = createSlice({
  name: "SavedTickets",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events = state.events.concat(action.payload);
    },
    removeEventByTitle(state, action) {
      state.events = state.events.filter(
        (x) => (x.events.title = action.payload.title)
      );
    },
  },
});

export const getSavedTicketsStateSelector = (state) => state.SavedTickets;

const SavedTicketsActions = SavedTicketsSlice.actions;

export { SavedTicketsActions, SavedTicketsSlice };
