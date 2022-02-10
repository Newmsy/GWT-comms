import { takeLatest, put } from "redux-saga/effects";
import { createEventActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* createEventWorker(action) {
  const apiClient = new ApiClient();

  console.log("Called worker");

  const response = yield apiClient.post(
    "/api/CalendarEvent",
    {
      eventJson: JSON.stringify(action.payload.eventInfo),
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
