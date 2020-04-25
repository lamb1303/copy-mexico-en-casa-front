import * as actionTypes from './actionTypes';

export const openEditNegocio = () => {
    return {
        type: actionTypes.OPEN_EDIT_NEGOCIO
    }
}

export const closeEditNegocio = () => {
    return {
        type: actionTypes.CLOSE_EDIT_NEGOCIO
    }
}