import * as actionTypes from './actionTypes';
import Axios from 'axios';


export const registrarNuevoCliente = (name) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_CLIENTE,
        name: name
    }
};

export const registrarNuevoNegocio = (negocio) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO,
        negocio: negocio
    }
}

export const registroNuevoNegocio = (negocio) => {
    return dispatch => {
        //mandar el negocio con axios
        // si se creo 
        dispatch(registrarNuevoNegocio(negocio))
        //si no lo crea mandar mensaje de error
    }
}