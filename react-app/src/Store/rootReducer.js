import { combineReducers } from "redux";
import { userSlice } from "./Areas/User/state";
import { createEventsSlice } from "./Areas/Events/CreateEvent/state";
import { getEventsSlice } from "./Areas/Events/FetchEvents/state";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  createEvent: createEventsSlice.reducer,
  events: getEventsSlice.reducer,
});
