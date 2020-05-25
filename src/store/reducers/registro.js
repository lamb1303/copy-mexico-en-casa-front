import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    cliente: false,
    negocio: false,
    name: '',
    id: null,
    registroNegocio: null,
    isAlert: false,
    alertType: '',
    message: "",
    cafe: false,
    // wellcome: true,
    personalInfo: false,
    negocioInfo: false,
    negocioFinal: false,
    avisoPriv: false,
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
        isAlert: true,
        alertType: 'Success',

    })
}

const goToPersonal = (state, action) => {
    return updateObject(state, {
        personalInfo: true,
        negocioInfo: false,
        negocioFinal: false,
        avisoPriv: false,
    })
}

const goToInfoNegocio = (state, action) => {
    return updateObject(state, {
        personalInfo: false,
        negocioInfo: true,
        negocioFinal: false,
        avisoPriv: false,
    })
}

const goToNegPago = (state, action) => {
    return updateObject(state, {
        personalInfo: false,
        negocioInfo: false,
        negocioFinal: true,
        avisoPriv: false,
    })
}

const goToPrivacidad = (state, action) => {
    return updateObject(state, {
        personalInfo: false,
        negocioInfo: false,
        negocioFinal: false,
        avisoPriv: true,
    })
}

const goToWelcome = (state, action) => {
    return updateObject(state, {
        personalInfo: false,
        negocioInfo: false,
        negocioFinal: false,
        avisoPriv: false,
    })
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.REGISTRAR_NUEVO_CLIENTE: return nuevoCliente(state, action);
        case actionTypes.REGISTRAR_NUEVO_NEGOCIO: return nuevoNegocio(state, action);
        case actionTypes.INICIAR_REGISTRO: return iniciarRegistro(state, action);
        case actionTypes.REGISTRO_FAIL: return registerFailed(state, action);
        case actionTypes.ADDED_FOOD_PRODUCT: return addProduct(state, action);
        case actionTypes.GO_TO_PERSONAL: return goToPersonal(state, action);
        case actionTypes.GO_TO_INFO_NEGOCIO: return goToInfoNegocio(state, action);
        case actionTypes.GO_TO_NEG_PAGO: return goToNegPago(state, action);
        case actionTypes.GO_TO_PRIVACIDAD: return goToPrivacidad(state, action);
        case actionTypes.GO_TO_WELCOME: return goToWelcome(state, action);
        default: return state
    }
};


export default reducer;