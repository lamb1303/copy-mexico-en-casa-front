import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';
import * as alertType from '../Util/enums/alertTypes';

export const getProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`).then(
        response => {
            console.log(response)
        }
    )
    return {
        type: actionTypes.GET_ALL_PRODUCTS
    }
}

export const addProduct = (foodProduct) => {
    return dispatch => {
        if (foodProduct) {

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
        type: actionTypes.ADD_PRODUCT_SHOW_MESSAGE,
        message: message,
        alertType: alertType.warning,
        isAlert: true,
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
        alertType: alertType.success,
    }
}

