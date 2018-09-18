import axios from "axios";
import {
  LOTTO_LIST,
  LOTTO_LIST_SUCCESS,
  LOTTO_LIST_FAILURE
} from "./ActionTypes";

export function lottoListRequest(isInitial, listType, id, username) {
  return dispatch => {
    dispatch(lottoList());

    let url = isInitial ? "/api/lotto" : `/api/lotto/${listType}/${id}`;

    return axios
      .get(url)
      .then(response => {
        dispatch(lottoListSuccess(response.data, isInitial, listType));
      })
      .catch(error => {
        dispatch(lottoListFailure());
      });
  };
}

export function lottoList() {
  return {
    type: LOTTO_LIST
  };
}

export function lottoListSuccess(data, isInitial, listType) {
  return {
    type: LOTTO_LIST_SUCCESS,
    data,
    isInitial,
    listType
  };
}

export function lottoListFailure() {
  return {
    type: LOTTO_LIST_FAILURE
  };
}
