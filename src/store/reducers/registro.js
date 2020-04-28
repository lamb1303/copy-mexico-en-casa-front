import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    cliente: false,
    negocio: false,
    name: '',
    otraCosa: false,
    id: null,
    registroNegocio: null
}


const nuevoCliente = (state, action) => {
    return updateObject(state, {
        cliente: true,
        negocio: false,
        id: action.id,
        loading: false
    })
}


const nuevoNegocio = (state, action) => {
    return updateObject(state, {
        cliente: false,
        negocio: true,
        registroNegocio: action.negocio
    })
}

const iniciarRegistro = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const registerFailed = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.REGISTRAR_NUEVO_CLIENTE: return nuevoCliente(state, action);
        case actionTypes.REGISTRAR_NUEVO_NEGOCIO: return nuevoNegocio(state, action);
        case actionTypes.INICIAR_REGISTRO: return iniciarRegistro(state, action);
        case actionTypes.REGISTRO_FAIL: return registerFailed(state, action);
        default: return state
    }
};


export default reducer;