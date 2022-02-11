import { takeLatest, put } from "redux-saga/effects";
import { createEventActions } from "./state";
import { ApiClient } from "../../../apiClient";
import { GetApiDateString } from "../../../../Utils/DateUtils";

function* createEventWorker(action) {
  const apiClient = new ApiClient();

  console.log("Called worker");

  const response = yield apiClient.post(
    "/api/CalendarEvent",
    {
      eventJson: JSON.stringify(action.payload.eventInfo),
      date: GetApiDateString(action.payload.date),
    },
    false
  );
  if (response?.ok) {
    yield put(createEventActions.createEventSuccess());
  }
}

export function* createEventWatcher() {
  yield takeLatest(
    createEventActions.createEvent.toString(),
    createEventWorker
  );
}
