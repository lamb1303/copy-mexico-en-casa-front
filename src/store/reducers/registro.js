import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    cliente: false,
    negocio: false,
    name: '',
    otraCosa: false,
    id: null,
    registroNegocio: null, 
    isProductAdded: false,
    message: "",
    cafe: false,
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


const addProduct = (state, action) => {
    return updateObject(state, {
        isProductAdded: true,
        message: action.message,

    })
}

const addProductClosed = (state, action) => {
    return updateObject(state, {
        
    })
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.REGISTRAR_NUEVO_CLIENTE: return nuevoCliente(state, action);
        case actionTypes.REGISTRAR_NUEVO_NEGOCIO: return nuevoNegocio(state, action);
        case actionTypes.INICIAR_REGISTRO: return iniciarRegistro(state, action);
        case actionTypes.REGISTRO_FAIL: return registerFailed(state, action);
        case actionTypes.ADDED_FOOD_PRODUCT: return addProduct(state, action);
        case actionTypes.CLOSE_ADD_PRODUCT: return addProductClosed(state, action);
        default: return state
    }
};


export default reducer;