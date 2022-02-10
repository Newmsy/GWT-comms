import { fork } from "redux-saga/effects";
import { userWatcher, signInUserWatcher } from "./Areas/User/effects";
import { createEventWatcher } from "./Areas/Events/CreateEvent/effects";
import { fetchEventsWatcher } from "./Areas/Events/FetchEvents/effects";

function* rootSaga() {
  yield fork(userWatcher);
  yield fork(signInUserWatcher);
  yield fork(createEventWatcher);
  yield fork(fetchEventsWatcher);
}

export { rootSaga };
