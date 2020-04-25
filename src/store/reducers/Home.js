import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    loading: false,
    error: false,
    token: null,
    usarname: "",

};


const login = (state, action) => {
    return updateObject(state, {
        token: action.token,
        loading: false
    })
}

const joinToUs = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const initializeRequest = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.HOME_LOGIN: return login(state, action);
        case actionTypes.HOME_JOIN_TO_US: return joinToUs(state, action);
        case actionTypes.HOME_WAITING: return initializeRequest(state, action);
        default: return state
    }
};


export default reducer;


