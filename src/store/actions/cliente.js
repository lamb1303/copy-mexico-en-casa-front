import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const CancelOrder = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CANCELAR
    }
}
export const AcceptOrder = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_ACEPTAR
    }
}
export const BackToDeliverOption = () => {
    return {
        type: actionTypes.CLIENTE_REGRESAR_OPCION_PEDIDO
    }
}
export const CashPayment = () => {
    return {
        type: actionTypes.CLIENTE_PAGO_EFECTIVO
    }
}
export const CreditCardPayment = () => {
    return {
        type: actionTypes.CLIENTE_PAGO_TARJETA
    }
}

export const OpenOrderModal = () => {
    return {
        type: actionTypes.CLIENTE_MODAL_ORDEN_ABRIR    
    }
}

export const CloseOrderModal = () => {
    return {
        type: actionTypes.CLIENTE_MODAL_ORDEN_CERRAR

    }
}

export const OrderIsToGo = (location) => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CASA,
        location: 'location'
    }
}

export const OrderLocation = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CASA,
        location: 'location'
    }
}

export const OrderToPickUp = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_RECOGER,
        location: 'location'
    }
}

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
            clientId: "cl2",
            negocioId: "ng1",
            name: "Shrek",
            products: {
                productId1: {
                    name: "Amborguesa",
                    amount: 2
                },
                productId2: {
                    name: "Taquitos",
                    amount: 2
                },
                productId3: {
                    name: "Algo mas",
                    amount: 2
                }
            },
            date: new Date().toLocaleString(),
            metodoPago: "Efectivo",
            metodoEntrega: "Local",
            stage: "receivedOrders"
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