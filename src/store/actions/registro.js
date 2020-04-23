import * as actionTypes from './actionTypes';


export const registrarNuevoCliente = (name) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_CLIENTE,
        name: name
    }
};

export const registrarNuevoNegocio = () => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO
    }
}