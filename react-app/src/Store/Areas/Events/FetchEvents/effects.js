import { takeLatest, put } from "redux-saga/effects";
import { getEventsActions } from "./state";
import { ApiClient } from "../../../apiClient";
import { ParseApiDateString } from "../../../../Utils/DateUtils";

function* fetchEventsWorker() {
  const apiClient = new ApiClient();

  const response = yield apiClient.get("/api/CalendarEvent/getall", false);

  if (response?.ok) {
    const data = yield response.json();

    const eventData = yield data.data.map((x) => {
      return { events: JSON.parse(x.json), date: ParseApiDateString(x.date) };
    });
    yield console.log(eventData);

    if (eventData.length > 0)
      yield put(getEventsActions.fetchEventsSuccess({ events: eventData }));
  }
}

export function* fetchEventsWatcher() {
  yield takeLatest(getEventsActions.fetchEvents.toString(), fetchEventsWorker);
}
