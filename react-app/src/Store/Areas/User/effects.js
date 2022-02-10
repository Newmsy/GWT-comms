import { takeLatest, put } from "redux-saga/effects";
import { userActions } from "./state";
import { ApiClient } from "../../apiClient";

function* fetchUserWorker(action) {
  const apiClient = new ApiClient();

  const response = yield apiClient.post(
    "/api/User",
    {
      email: action.payload.email,
    },
    false
  );
  if (response?.ok) {
    const data = yield response.json();
    yield put(userActions.fetchUserIdSuccess({ userId: data.id }));
  }
}

export function* userWatcher() {
  yield takeLatest(userActions.fetchUser.toString(), fetchUserWorker);
}
