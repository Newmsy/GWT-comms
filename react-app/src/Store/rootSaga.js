import { fork } from "redux-saga/effects";
import { userWatcher, signInUserWatcher } from "./Areas/User/effects";
import { createEventWatcher } from "./Areas/Ticket/CreateTicket/effects";
import { fetchEventsWatcher } from "./Areas/Ticket/FetchTickets/effects";

function* rootSaga() {
  yield fork(userWatcher);
  yield fork(signInUserWatcher);
  yield fork(createEventWatcher);
  yield fork(fetchEventsWatcher);
}

export { rootSaga };
