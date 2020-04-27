import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    businessCliked: false,
    customerCliked: false
}

const clickOnBusiness = (state, action) => {
    return updateObject(state, {
        businessCliked: true,
        customerCliked: false
    });
}

const clickOnCustomer = (state, action) =>{
    return updateObject(state, {
        customerCliked: true,
        businessCliked: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SELECTION_MODAL_BUSINESS: return clickOnBusiness(state, action);
        case actionTypes.SELECTION_MODAL_CUSTOMER: return clickOnCustomer(state, action);
        default: return state;
    }

}

export default reducer;