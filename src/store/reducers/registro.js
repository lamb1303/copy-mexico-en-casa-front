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
    personalInfo: false,
    negocioInfo: false,
    negocioFinal: false,
    avisoPriv: false,
    personalData: {},
    days: [
        {
            id: 1,
            dia: 'Lunes',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 2,
            dia: 'Martes',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 3,
            dia: 'Miercoles',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 4,
            dia: 'Jueves',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 5,
            dia: 'Viernes',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 6,
            dia: 'Sabado',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
        {
            id: 7,
            dia: 'Domingo',
            abierto: false,
            horaAbierto: '',
            horaCerrado: '',
        },
    ],
    negocioData: {},
    pagoEfectivo: false,
    pagoTarjeta: false,
    entregaDomicilio: false,
    entregaNegocio: false,
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
        avisoPriv: false
    })
}

const goToPrivacidad = (state, action) => {
    return updateObject(state, {
        avisoPriv: action.isOpen,
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

const SetPersonalData = (state, action) => {
    return updateObject(state, {
        personalData: action.data
    })
}

const handleHorarios = (state, action) => {
    let dia = state.days.find(day => day.id === action.id);

    if (action.estado === 'abierto') {
        dia.horaAbierto = action.value
    } else {
        dia.horaCerrado = action.value
    };
    dia.abierto = true;
    const tempDays = state.days.filter(day => day.id !== action.id);
    tempDays.push(dia);
    tempDays.sort((a, b) => a.id - b.id);

    return updateObject(state, {
        days: tempDays
    })

}

const isOpen = (state, action) => {
    let dia = state.days.find(day => day.id === action.id);
    if (!action.value) {
        dia.horaAbierto = "";
        dia.horaCerrado = "";
    }
    dia.abierto = action.value;
    const tempDays = state.days.filter(day => day.id !== action.id);
    tempDays.push(dia);
    tempDays.sort((a, b) => a.id - b.id);

    return updateObject(state, {
        days: tempDays
    })
}

const setNegocioData = (state, action) => {
    const negocioData = {
        nombre: action.nombre,
        direccion: action.direccion,
        descripcion: action.descripcion
    }
    return updateObject(state, {
        negocioData: negocioData
    })
}

const pagoTarjeta = (state, action) => {
    return updateObject(state, {
        pagoTarjeta: !state.pagoTarjeta
    })
}

const pagoEfectivo = (state, action) => {
    return updateObject(state, {
        pagoEfectivo: !state.pagoEfectivo,
    })
}

const entregaDomicilio = (state, action) => {
    return updateObject(state, {
        entregaDomicilio: !state.entregaDomicilio
    })
}

const entregaNegocio = (state, action) => {
    return updateObject(state, {
        entregaNegocio: !state.entregaNegocio
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
        case actionTypes.REGISTRO_SET_PERSONAL_DATA: return SetPersonalData(state, action);
        case actionTypes.HANDLE_HORARIO: return handleHorarios(state, action);
        case actionTypes.IS_OPEN: return isOpen(state, action);
        case actionTypes.REGISTRO_SET_NEGOCIO_DATA: return setNegocioData(state, action);
        case actionTypes.REGISTRO_PAGO_EFECTIVO: return pagoEfectivo(state, action);
        case actionTypes.REGISTRO_PAGO_TARJETA: return pagoTarjeta(state, action);
        case actionTypes.REGISTRO_ENTREGA_DOMICILIO: return entregaDomicilio(state, action);
        case actionTypes.REGISTRO_ENTREGA_NEGOCIO: return entregaNegocio(state, action);
        default: return state
    }
};


export default reducer;