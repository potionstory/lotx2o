import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  home: false
};

export default function header(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.HEADER_HOME_ON:
      return update(state, {
        home: { $set: true }
      });
    case types.HEADER_HOME_OFF:
      return update(state, {
        home: { $set: false }
      });
    default:
      return state;
  }
}
