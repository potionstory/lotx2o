import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    save: {
        status: 'INIT'
    },
    remove: {
        status: 'INIT'
    },
    status: {
        count: 1,
        number : []
    }
};

export default function lotto(state, action) {

    if (typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        case types.LOTTO_SAVE:
            return update(state, {
                save: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.LOTTO_SAVE_SUCCESS:
            return update(state, {
                save: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.LOTTO_SAVE_FAILURE:
            return update(state, {
                save: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.LOTTO_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.LOTTO_REMOVE_SUCCESS:
            return update(state, {
                remove: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.LOTTO_REMOVE_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }
    
}