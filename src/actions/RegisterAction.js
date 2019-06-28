// @flow

import { REGISTER } from "./ActionTypes";

export function request(url, payload: Object) {
  return {
    url,
    payload,
    type: REGISTER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: REGISTER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: REGISTER.FAILURE
  };
}
