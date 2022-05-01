import { takeLatest, put } from "redux-saga/effects";
import { getEventsActions } from "./state";
import { ApiClient } from "../../../apiClient";
import { ParseApiDateString } from "../../../../Utils/DateUtils";

function* fetchEventsWorker() {
  const apiClient = new ApiClient();

  const response = yield apiClient.get("/api/ticket/getall", false);

  if (response?.ok) {
    const data = yield response.json();

    
   
      yield put(getEventsActions.fetchEventsSuccess({ tickets: data.data }));
  }
}

export function* fetchEventsWatcher() {
  yield takeLatest(getEventsActions.fetchEvents.toString(), fetchEventsWorker);
}
