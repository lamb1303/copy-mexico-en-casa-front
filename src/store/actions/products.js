import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';
import * as alertTypes from '../Util/enums/alertTypes';

export const getProducts = (id) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getProducts/${id}`).then(
            response => {
                const products = response.data.products
                const updatedProducts = Object.keys(products).map(
                    igKey => {
                        return [...Array(products[igKey])].map((field, i) => {
                            return {
                                key: igKey,
                                name: field.name,
                                price: field.price,
                                desc: field.desc,
                                url: field.url
                            }
                        })
                    }
                ).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
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

export const addProduct = (formData) => {
    return dispatch => {
        dispatch(initializeRequest());
        if (formData) {

            axios.post(`${process.env.REACT_APP_API_URL}/product/addProduct`, formData, createHeaders({
                'content-type': `multipart/form-data  boundary=${formData._boundary}`
            }))
                .then(response => {
                    const data = response.data;
                    if (response.status === 201) {
                        dispatch(productAdded(data.message));
                    }
                }).catch(error => {
                    if (error.response) {
                        dispatch(message(error.response.data.message));
                        if (error.response.status === 403) {
                            setTimeout(
                                () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                        }
                    }
                });
        }

    }
}

export const updateProduct = (id, formData) => {
    return dispatch => {
        if (formData) {
            dispatch(initializeRequest());
            axios.patch(`${process.env.REACT_APP_API_URL}/product/updateProduct/${id}`, formData,
                createHeaders({
                    'content-type': `multipart/form-data  boundary=${formData._boundary}`
                }
                ))
                .then(response => {
                    const data = response.data;
                    if (response.status === 201) {
                        dispatch(openAlert(data.message));
                    }
                })
                .catch(error => {
                    if (error.response) {
                        dispatch(errorMessageEditProductAlert(error.response.data.message));
                        if (error.response.status === 403) {
                            setTimeout(
                                () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                        }
                    }
                });
        }

    }
}

export const deleteProduct = (prodToDelete) => {
    return dispatch => {
        if (prodToDelete) {
            axios.delete(`${process.env.REACT_APP_API_URL}/product/deleteProduct/`,
                { data: { ...prodToDelete } }, createHeaders())
                .then(response => {
                    const data = response.data;
                    if (response.status === 201) {
                        dispatch(openAlert(data.message));
                    }

                })
                .catch(error => {
                    if (error.response) {
                        dispatch(errorMessageEditProductAlert(error.response.data.message));
                        if (error.response.status === 403) {
                            setTimeout(
                                () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                        }
                    }
                })
        }
    }

}

export const accessDeny = (message) => {
    return {
        type: actionTypes.HOME_LOGOUT,
    }
}

export const updateAddProductAlert = () => {
    return {
        type: actionTypes.ADD_PRODUCT_UPDATE_ALERT,
    }
}

export const changeIsProductAdded = () => {
    return {
        type: actionTypes.CHANGE_IS_PRODUCT_ADDED,
    }
}

const initializeRequest = () => {
    return {
        type: actionTypes.ADD_PRODUCT_INIT_REQUEST,
    }
}

const message = (message) => {
    return {
        type: actionTypes.ADD_PRODUCT_SHOW_MESSAGE,
        isAlert: true,
        alertType: alertTypes.warning,
        message: message,
    }
}


const productAdded = (message) => {
    return {
        type: actionTypes.ADDED_FOOD_PRODUCT,
        message: message,
        isAlert: true,
        alertType: alertTypes.success,
        isProductAdded: true,
        loading: false,
    }
}

const openAlert = (message) => {
    return {
        type: actionTypes.UPDATED_FOOD_PRODUCT,
        message: message,
        isEditAlert: true,
        alertType: alertTypes.success,
        loading: false,
    }
}

export const closeEditProductAlert = () => {
    return {
        type: actionTypes.CLOSE_EDIT_PRODUCT_ALERT,
    }
}

export const errorMessageEditProductAlert = (message) => {
    return {
        type: actionTypes.ERROR_MESSAGE_EDIT_PRODUCT_ALERT,
        message: message,
        alertType: alertTypes.warning,
        isEditAlert: true,
        loading: false,
    }
}


