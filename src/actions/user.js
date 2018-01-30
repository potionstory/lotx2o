import axios from 'axios';
import {
    USER_INFO
} from './ActionTypes';

/* lotto User 정보 가져오기 */
export function userInfoRequest() {
    return (dispatch) => {
        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(userInfo(response.data.info.money, response.data.info.lotto.count, response.data.info.lotto.number));
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function userInfo(money, count, number) {
    return {
        type: USER_INFO,
        money,
        count,
        number
    };
}