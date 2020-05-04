import * as actionTypes from './actionTypes';
import axios from 'axios';

// export const crearCuenta = () => {
//     return {
//         type: actionTypes.CLIENTE_CREAR_CUENTA
//     }
// };

// export const iniciarRequestCreacion = () => {
//     return {
//         type: actionTypes.CLIENTE_INICIAR_CREACION
//     }
// }

// export const falloLaCreacion = () => {
//     return {
//         type: actionTypes.CLIENTE_FALLO_CREACION_CUENTA
//     }
// }


// export const crearCuentaCliente = (datos) => {
//     return dispatch => {

//         dispatch(iniciarRequestCreacion());
//         axios.post('/laurl/api/crearUsuario', datos)
//             .then(response => {
//                 if (response.data.status === 201) {
//                     dispatch(crearCuenta());
//                 } else {
//                     dispatch(falloLaCreacion())
//                 }
//             })
//     }
// }

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
