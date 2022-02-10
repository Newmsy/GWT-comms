import { takeLatest, put } from "redux-saga/effects";
import { getEventsActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* fetchEventsWorker(action) {
  const apiClient = new ApiClient();

  const response = yield apiClient.post(
    "/api/events/all",
    { userId: action.payload.userId },
    false
  );
  if (response?.ok) {
    const data = yield response.json();
    yield put(getEventsActions.fetchEventsSuccess({ events: data.events }));
  }
}

export function* fetchEventsWatcher() {
  yield takeLatest(getEventsActions.fetchEvents.toString(), fetchEventsWorker);
}
