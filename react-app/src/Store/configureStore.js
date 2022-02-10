import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

export function configureStore(
  initialState = {},
  options = { useSagaMiddleware: true }
) {
  const sagaMiddleware = createSagaMiddleware({
    onError: (err, { sagaStack }) => {},
  });

  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, initialState, middlewareEnhancer);
  sagaMiddleware.run(rootSaga);

  return store;
}
