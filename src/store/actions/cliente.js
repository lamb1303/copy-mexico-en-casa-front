import * as actionTypes from './actionTypes';
import axios from 'axios';

export const OpenSelectedProduct = (product) => {
    return {
        type: actionTypes.OPEN_ADD_DEL_OPTIONS,
        product: product
    }
}
export const CloseSelectedProduct = () => {
    return {
        type: actionTypes.CLOSE_ADD_DEL_OPTIONS,
    }
}

export const AddOneToSelectedProduct = (product, price) => {
    return {
        type: actionTypes.ADD_ONE_TO_SELECTED_PRODUCT,
        product: product,
        price: price
    }
}

export const DelOneToSelectedProduct = (product, price) => {
    return {
        type: actionTypes.DEL_ONE_TO_SELECTED_PRODUCT,
        product: product,
        price: price
    }
}

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    }
}

export const checkoutComplete = () => {
    return {
        type: actionTypes.CHECKOUT_COMPLETE
    }
}

export const checkoutFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_FAIL,
        error: error
    }
}

export const checkout = (orderToSend) => {
    return dispatch => {
        dispatch(checkoutInit());
        console.log('CHECKOUT INICIADO...')
        const order = {
            clientId: "cl1",
            name: "Maria",
            products: {
                productId1: {
                    name: "Pizza",
                    amount: 1
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2
                },
                productId3: {
                    name: "Tacos",
                    amount: 4
                }
            },
            date: new Date().toLocaleString(),
            metodoPago: "Efectivo",
            metodoEntrega: "Domicilio"
        }

        axios.post(`${process.env.REACT_APP_API_URL}/client/checkout`, order)
            .then(resp => {
                if (resp.data.message === 'Order received by Business') {
                    dispatch(checkoutComplete())
                } else {
                    dispatch(checkoutFail('CHECKOUT FALLO'))
                }
            })
            .catch(err => {
                dispatch(checkoutFail('CHECKOUT FALLO'))
            })
    }
}