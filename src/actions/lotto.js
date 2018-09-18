import axios from "axios";
import {
  LOTTO_SAVE,
  LOTTO_SAVE_SUCCESS,
  LOTTO_SAVE_FAILURE,
  LOTTO_REMOVE,
  LOTTO_REMOVE_SUCCESS,
  LOTTO_REMOVE_FAILURE
} from "./ActionTypes";

/* lotto 번호추가 액션 생성자 */
export function lottoSaveRequest(count, number, username) {
  return dispatch => {
    dispatch(lottoSave());
    return axios
      .post("/api/lotto/save", { count, number, username })
      .then(response => {
        dispatch(lottoSaveSuccess());
      })
      .catch(error => {
        dispatch(lottoSaveFailure());
      });
  };
}

/* lotto 번호삭제 액션 생성자 */
export function lottoRemoveRequest(id) {
  return dispatch => {
    dispatch(lottoRemove());

    return axios
      .post("/api/lotto/remove", { id })
      .then(response => {
        dispatch(lottoRemoveSuccess());
      })
      .catch(error => {
        dispatch(lottoRemoveFailure());
      });
  };
}

export function lottoSave() {
  return {
    type: LOTTO_SAVE
  };
}

export function lottoSaveSuccess() {
  return {
    type: LOTTO_SAVE_SUCCESS
  };
}

export function lottoSaveFailure() {
  return {
    type: LOTTO_SAVE_FAILURE
  };
}

export function lottoRemove() {
  return {
    type: LOTTO_REMOVE
  };
}

export function lottoRemoveSuccess() {
  return {
    type: LOTTO_REMOVE_SUCCESS
  };
}

export function lottoRemoveFailure() {
  return {
    type: LOTTO_REMOVE_FAILURE
  };
}

export function lottoCountIncrease(count) {
  return {
    type: LOTTO_COUNT_INCREASE,
    count
  };
}

export function lottoCountDecrease(count) {
  return {
    type: LOTTO_COUNT_DECREASE,
    count
  };
}

export function lottoNumberUpdate(index, number) {
  return {
    type: LOTTO_NUMBER_UPDATE,
    index,
    number
  };
}
