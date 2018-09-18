import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  status: {
    money: 0,
    count: 0,
    number: []
  }
};

export default function user(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.USER_INFO:
      return update(state, {
        status: {
          money: { $set: action.money },
          count: { $set: action.count },
          number: { $set: action.number }
        }
      });
    default:
      return state;
  }
}
