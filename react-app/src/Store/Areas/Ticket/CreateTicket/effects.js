import { takeLatest, put } from "redux-saga/effects";
import { createEventActions } from "./state";
import { ApiClient } from "../../../apiClient";

function* createEventWorker(action) {
  const apiClient = new ApiClient();

  const response = yield apiClient.post(
    "/api/ticket",
    {
      title: action.payload.title,
        description: action.payload.description,
        isInSprint: action.payload.isInSprint,
        etaDays:  parseInt(action.payload.etaDays),
        createdBy: action.payload.createdBy
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
