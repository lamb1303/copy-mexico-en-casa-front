import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as alertTypes from '../../store/Util/enums/alertTypes';

const initialState = {
    loading: false,
    isProductAdded: false,
    isAlert: false,
    alertType: '',
    message: "",
    products: []
}


const initializeRequest = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
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
        isProductAdded: action.isProductAdded,
        loading: action.loading,

    })
}

const updateAddProductAlert = (state, action) => {
    return  updateObject(state, {
        isAlert: false,
    });
}

const message = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isAlert: action.isAlert,
        alertType: alertTypes.error,
        loading: false,
    });

}

const changeIsProductAdded = (state, action) => {
    return updateObject(state, {
        isProductAdded: !state.isProductAdded,

    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_INIT_REQUEST: return initializeRequest(state, action);
        case actionTypes.ADDED_FOOD_PRODUCT: return addProduct(state, action);
        case actionTypes.ADD_PRODUCT_UPDATE_ALERT: return updateAddProductAlert(state, action);
        case actionTypes.GET_ALL_PRODUCTS: return getProductsSuccess(state, action);
        case actionTypes.ADD_PRODUCT_SHOW_MESSAGE: return message(state, action);
        case actionTypes.CHANGE_IS_PRODUCT_ADDED: return changeIsProductAdded(state, action);
        default: return state;
    }
}


export default reducer;