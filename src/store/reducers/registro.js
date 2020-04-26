import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    cliente: false,
    negocio: false,
    name: '',
    otraCosa: false,
    loading: false,
    registroNegocio: null
}


const nuevoCliente = (state, action) => {
    return updateObject(state, {
        cliente: true,
        negocio: false,
        name: action.name
    })
}


const nuevoNegocio = (state, action) => {
    return updateObject(state, {
        cliente: false,
        negocio: true,
        registroNegocio: action.negocio
    })
}



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.REGISTRAR_NUEVO_CLIENTE: return nuevoCliente(state, action);
        case actionTypes.REGISTRAR_NUEVO_NEGOCIO: return nuevoNegocio(state, action);
        default: return state
    }
};


export default reducer;