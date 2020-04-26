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
