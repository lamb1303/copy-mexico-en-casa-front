import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';
import * as alertType from '../Util/enums/alertTypes';

export const getProducts = (id) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/getProducts/${id}`).then(
            response => {
                const products = response.data.products
                const updatedProducts = Object.keys(products).map(
                    igKey => {
                        return [...Array(products[igKey])].map((field   , i) => {
                            return {
                                key: igKey,
                                name: field.name,
                                price: field.price,
                                description: field.description,
                                url: field.url
                            }
                        })
                    }
                ).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                console.log(updatedProducts)
                dispatch(getProductsSuccess(updatedProducts))
            }
        ).catch(e => console.log(e))
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

