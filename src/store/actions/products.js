import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';
import * as alertType from '../Util/enums/alertTypes';

export const getProducts = (id) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/getProducts/${id}`).then(
            response => {
                const products = response.data.products
                const selectedBusiness = response.data.businessData

                const updatedProducts = (products.map(
                    prod => {
                        return {
                            key: prod.name,
                            name: prod.name,
                            price: prod.price,
                            desc: prod.desc,
                            url: prod.url
                        }
                    }
                ))
                dispatch(getProductsSuccess(updatedProducts))
                dispatch(getBusinessInfo(selectedBusiness))
            }
        ).catch(e => console.log(e))
    }
}

 const getBusinessInfo = (business) => {
    return {
        type: actionTypes.CLIENTE_SET_SELECTED_BUSINESS,
        business: business
    }
}
export const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_ALL_PRODUCTS,
        products: products
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
                }).catch(error => {
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

