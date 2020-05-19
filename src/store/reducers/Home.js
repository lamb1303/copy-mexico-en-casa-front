import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    loading: false,
    error: false,
    token: null,
    id: null,
    isCustomer: null,
    usarname: "",
    join: false,
    message: "",

};


const login = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        id: action.id,
        isCustomer: action.isCustomer,
    });
}

const setLocalTokenStored = (state, action) => {
    return updateObject(state, {
        token: action.token,
        isCustomer: action.isCustomer,
    });
}

const joinToUs = (state, action) => {
    return updateObject(state, {
        join: true
    });
}

const joinToUsClosed = (state, action) => {
    return updateObject(state, {
        join: false
    });
}

const initializeRequest = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const message = (state, action) => {
    return updateObject(state, {
        message: action.message,
        error: true,
    });

}

const updateError = (state, action) => {
    return updateObject(state, {
        error: !state.error
    });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.HOME_LOGIN: return login(state, action);
        case actionTypes.HOME_SET_LOCAL_TOKEN_STORED: return setLocalTokenStored(state, action);
        case actionTypes.HOME_JOIN_TO_US: return joinToUs(state, action);
        case actionTypes.HOME_JOIN_TO_US_CLOSED: return joinToUsClosed(state, action);
        case actionTypes.HOME_WAITING: return initializeRequest(state, action);
        case actionTypes.HOME_INVALID_CREDENTIALS: return message(state, action);
        case actionTypes.HOME_UPDATE_ERROR: return updateError(state, action);
        default: return state
    }
};


export default reducer;


