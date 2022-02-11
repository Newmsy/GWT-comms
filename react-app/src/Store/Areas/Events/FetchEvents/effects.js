import { takeLatest, put } from "redux-saga/effects";
import { getEventsActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* fetchEventsWorker(action) {
  const apiClient = new ApiClient();

  // const response = yield apiClient.get("/api/CalendarEvent/all", false);
  // if (response?.ok) {
  //   const data = yield response.json();
  //   if (data.length > 0)
  //     yield put(
  //       getEventsActions.fetchEventsSuccess({ events: JSON.parse(data) })
  //     );
  // }
}

export function* fetchEventsWatcher() {
  yield takeLatest(getEventsActions.fetchEvents.toString(), fetchEventsWorker);
}
