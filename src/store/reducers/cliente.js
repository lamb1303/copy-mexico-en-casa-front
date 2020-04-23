import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: false,
    loading: false,
    cliente: null
}

const crearCuenta = (state, action) => {
    return updateObject(state, {
        cliente: action.cliente,
        loading: false
    })
}

const iniciarCreacion = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

const falloCreacionCuenta = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    })
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENTE_CREAR_CUENTA: return crearCuenta(state, action);
        case actionTypes.CLIENTE_FALLO_CREACION_CUENTA: return falloCreacionCuenta(state, action);
        case actionTypes.CLIENTE_INICIAR_CREACION: return iniciarCreacion(state, action);
        default: return state;
    }
}