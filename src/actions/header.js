import {
    HEADER_HOME_ON,
    HEADER_HOME_OFF
} from './ActionTypes';

/* 헤더 Home O */
export function headerHomeOn() {
    return {
        type: HEADER_HOME_ON
    };
}

/* 헤더 Home X */
export function headerHomeOff() {
    return {
        type: HEADER_HOME_OFF
    };
}