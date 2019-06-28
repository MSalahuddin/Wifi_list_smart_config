import counter from "./counter";
import register from "./register";
import { fork } from "redux-saga/effects";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield fork(counter);
  yield fork(register);
}
