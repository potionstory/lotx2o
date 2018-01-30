import header from './header';
import authentication from './authentication';
import user from './user';
import lotto from './lotto';
import lottoList from './lottoList';
import { combineReducers } from 'redux';

export default combineReducers({
    header,
    authentication,
    user,
    lotto,
    lottoList
});