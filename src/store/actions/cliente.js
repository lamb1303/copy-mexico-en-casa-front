import * as actionTypes from './actionTypes';
import axios from 'axios';

export const crearCuenta = () => {
    return {
        type: actionTypes.CLIENTE_CREAR_CUENTA
    }
};

export const iniciarRequestCreacion = () => {
    return {
        type: actionTypes.CLIENTE_INICIAR_CREACION
    }
}

export const falloLaCreacion = () => {
    return {
        type: actionTypes.CLIENTE_FALLO_CREACION_CUENTA
    }
}


export const crearCuentaCliente = (datos) => {
    return dispatch => {

        dispatch(iniciarRequestCreacion());
        axios.post('/laurl/api/crearUsuario', datos)
            .then(response => {
                if (response.data.status === 201) {
                    dispatch(crearCuenta());
                } else {
                    dispatch(falloLaCreacion())
                }
            })
    }
}