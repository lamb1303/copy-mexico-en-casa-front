import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isProductAdded: false,
    isAlert: false,
    alertType: '',
    message: "",
    products: []
}
export const getProductsSuccess = (state, action) => {
    return updateObject(state, {
        products: action.products
    })
}

const addProduct = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isAlert: action.isAlert,
        alertType: action.alertType,
        isProductAdded: true,

    })
}

const updateAddProductAlert = (state, action) => {
    return  updateObject(state, {
        isAlert: !state.isAlert,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADDED_FOOD_PRODUCT: return addProduct(state, action);
        case actionTypes.ADD_PRODUCT_UPDATE_ALERT: return updateAddProductAlert(state, action);
        case actionTypes.GET_ALL_PRODUCTS: return getProductsSuccess(state, action);
        default: return state;
    }
}


export default reducer;