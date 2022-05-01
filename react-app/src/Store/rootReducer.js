import { combineReducers } from "redux";
import { userSlice } from "./Areas/User/state";
import { createEventsSlice } from "./Areas/Ticket/CreateTicket/state";
import { getEventsSlice } from "./Areas/Ticket/FetchTickets/state";
import { toastSlice } from "./Areas/Toast/state";
import { SavedTicketsSlice } from "./Areas/Ticket/SavedTickets/state";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  createEvent: createEventsSlice.reducer,
  events: getEventsSlice.reducer,
  toast: toastSlice.reducer,
  SavedTickets: SavedTicketsSlice.reducer,
});
