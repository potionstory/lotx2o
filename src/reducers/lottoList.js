import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  list: {
    status: "INIT",
    data: [],
    isLast: false
  }
};

export default function lottoList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.LOTTO_LIST:
      return update(state, {
        list: {
          status: { $set: "WAITING" }
        }
      });
    case types.LOTTO_LIST_SUCCESS:
      if (action.isInitial) {
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.data },
            isLast: { $set: action.data.length < 20 }
          }
        });
      } else {
        if (action.listType == "new") {
          return update(state, {
            list: {
              status: { $set: "SUCCESS" },
              data: { $set: action.data }
              //data: { $unshift: action.data }
            }
          });
        } else {
          return update(state, {
            list: {
              status: { $set: "SUCCESS" },
              data: { $push: action.data },
              isLast: { $set: action.data.length < 20 }
            }
          });
        }
      }
      return state;
    case types.LOTTO_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
