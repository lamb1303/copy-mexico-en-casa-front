import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';

export const getProducts = () => {
    return {
        type: actionTypes.GET_ALL_PRODUCTS
    }
}

export const addProduct = (foodProduct) => {
    return dispatch => {
        if (foodProduct) {
            console.log(createHeaders());

            axios.post(`${process.env.REACT_APP_API_URL}/business/addProduct`, foodProduct, createHeaders())
                .then(response => {
                    const data = response.data;
                    if (response.status === 201) {
                        dispatch(productAdded(data.message));
                    }
                }).catch(error =>{
                    error.response && (dispatch(message(error.response.data.message)));
                });
        }

    }
}

const message = (message) => {
    return {
        type: actionTypes.HOME_INVALID_CREDENTIALS,
        message: message,
    }
}

export const updateAddProductAlert = () => {
    return {
        type: actionTypes.ADD_PRODUCT_UPDATE_ALERT,
    }
}

const productAdded = (message) => {
    return {
        type: actionTypes.ADDED_FOOD_PRODUCT,
        message: message,
        isAlert: true,
        alertType: 'Success'
    }
}

