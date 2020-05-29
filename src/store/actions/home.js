import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initializeRequest = () => {
    return {
        type: actionTypes.HOME_WAITING
    }
}

export const login = (credentials) => {
    return dispatch => {

        dispatch(initializeRequest());
        axios.post(`${process.env.REACT_APP_API_URL}/home/login`, credentials)
            .then(response => {
                const data = response.data;
                switch (response.status) {
                    case 201:
                        const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
                        localStorage.setItem(
                            'user',
                            JSON.stringify({
                                ...data,
                                expiration: tokenExpirationDate.toISOString()
                            })
                        );
                        dispatch(logging(data));
                        break;

                    default:
                        break;

                }
            }).catch(err => {

                err.response && (dispatch(message(err.response.data.message)));
            });
    }

}

const logging = (data) => {
    return {
        type: actionTypes.HOME_LOGIN,
        error: false,
        ...data
    }
};

export const setLocalTokenStored = (data) => {

    return {
        type: actionTypes.HOME_SET_LOCAL_TOKEN_STORED,
        ...data,

    }
}

const message = (message) => {
    return {
        type: actionTypes.HOME_SHOW_MESSAGE,
        message: message,
    }
}

export const joinToUs = () => {
    return {
        type: actionTypes.HOME_JOIN_TO_US
    }
}

export const joinToUsClosed = () => {
    return {
        type: actionTypes.HOME_JOIN_TO_US_CLOSED
    }
}

export const getUserType = (userId) => {
    return dispatch => {
        dispatch(initializeRequest());
        axios.get(`${process.env.REACT_APP_API_URL}/home/login/getUserType/${userId}`)
            .then(response => {
                const data = response.data;
                switch (response.status) {
                    case 201:
                        dispatch(setLocalTokenStored(data));

                        break;

                    default:
                        break;

                }
            }).catch(err => {

                err.response && (dispatch(message(err.response.data.message)));
            });
    }
}


export const updateHomeAlert = () => {
    return {
        type: actionTypes.HOME_UPDATE_ALERT,
    }
}