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

function* signInUserWorker(action) {
  const apiClient = new ApiClient();

  // const response = yield apiClient.post(
  //   "/api/user/login",
  //   {
  //     email: action.payload.email,
  //     password: action.payload.password,
  //   },
  //   false
  // );

  // if (response?.ok) {
  //   const data = yield response.json();
  //   yield put(
  //     userActions.fetchUserIdSuccess({
  //       userId: data.id,
  //       emailAddress: action.payload.email,
  //     })
  //   );
  // }

  yield console.log("called sign in");

  yield put(
    userActions.signInSuccess({
      userId: "1",
      emailAddress: action.payload.email,
    })
  );
}

export function* signInUserWatcher() {
  yield takeLatest(userActions.signIn.toString(), signInUserWorker);
}
