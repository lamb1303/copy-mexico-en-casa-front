import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as alertTypes from '../Util/enums/alertTypes';

const initialState = {
    isAlert: false,
    alertType: '',
    message: '',
    error: false,
    loading: false,
    cliente: false,
    openProduct: false,
    selectedProduct: '',
    productCount: [],
    checkoutInit: false,
    orderPrice: 0,
    openOrder: false,
    checkoutError: null,
    totalAmount: 0,
    businesses: {},
    updated: false,
    updatedPsw: false,
    location: {}
}

const getBusinessesSuccess = (state, action) => {
    return updateObject(state, {
        businesses: action.businesses
    })
}

const openOrderModal = (state, action) => {
    return updateObject(state, {
        openOrder: true
    })
}

const clientClickLogo = (state, action) => {
    return updateObject(state, {
        openOrder: false,
        productCount: [],
        totalAmount: 0,
        orderPrice: 0,
        selectedProduct: '',
        isAlert: false,
        alertType: '',
        message: '',
        openProduct: false
    })
}
const closeOrderModal = (state, action) => {
    return updateObject(state, {
        openOrder: false,
    })
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

const openSelectedProduct = (state, action) => {
    return updateObject(state, {
        openProduct: true,
        selectedProduct: action.product,
        imageProduct: action.img
    })
}

const closeSelectedProduct = (state, action) => {
    return updateObject(state, {
        openProduct: false,
        selectedProduct: ''
    })
}

const addOneToSelectedProduct = (state, action) => {

    const product = state.productCount.find(prod => prod.name === action.product);


    //if the product exist in the list
    if (product) {
        //get all items but the one selected
        let copy = state.productCount.filter(x => x.name !== action.product)
        //add 1 to the selected product
        // const newProduct = {
        //     ...product,
        //     count: product.count + 1
        // };

        const newProduct = updateObject(product, {
            amount: product.amount + 1,

        })

        //add into the items the product + 1
        copy.push(newProduct)

        //update the state
        const newPrice = state.orderPrice + action.price
        return updateObject(state, {
            productCount: copy,
            orderPrice: newPrice,
            totalAmount: state.totalAmount + 1,
        })
    } else {
        const newProduct = {
            name: action.product,
            amount: 1,
            img: action.img
        }
        const newPrice = state.orderPrice + action.price
        return updateObject(state, {
            productCount: [...state.productCount, newProduct],
            orderPrice: newPrice,
            totalAmount: state.totalAmount + 1,
        })

    }

}

const delOneToSelectedProduct = (state, action) => {

    const product = state.productCount.find(prod => prod.name === action.product);

    //if the product exist in the list
    if (product) {
        //get all items but the one selected
        let copy = state.productCount.filter(x => x.name !== action.product);

        //del 1 to the selected product
        const newProduct = {
            ...product,
            amount: product.amount - 1
        };


        //add into the items the product - 1
        copy.push(newProduct)

        //update the state
        const newPrice = state.orderPrice - action.price;
        return updateObject(state, {
            productCount: copy,
            orderPrice: newPrice,
            totalAmount: state.totalAmount - 1,
        })
    }
}
const setCoordinates = (state, action) => {
    return updateObject(state, {
        location: {
            latitude: action.coords.lat,
            longitude: action.coords.lng
        }
      
    })
}

export const checkoutInit = (state, action) => {
    return updateObject(state, {
        checkoutInit: true,
        isAlert: !state.isAlert,
        message: "La orden ha sido enviada exitosamente.",
        alertType: alertTypes.success
    })
}

export const checkoutComplete = (state, action) => {
    return updateObject(state, {
        checkoutInit: false,
        productCount: [],
        orderPrice: 0,
        totalAmount: 0,
        openProduct: false
    })
}

export const checkoutCancel = (state, action) => {
    return updateObject(state, {
        checkoutInit: false,
        productCount: [],
        orderPrice: 0,
        totalAmount: 0,
        isAlert: !state.isAlert,
        alertType: alertTypes.error,
        message: 'La orden ha sido cancelada',
        openProduct: false
    })
}

export const checkoutFail = (state, action) => {
    return updateObject(state, {
        checkoutInit: false,
        checkoutError: action.error
    })
}

export const getClientInit = (state, action) => {
    return updateObject(state, {
        loading: true,
        updated: false,
        updatedPsw: false,
    })
}

export const getClientSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        cliente: action.client,
        error: false,
        updated: false,
        updatedPsw: false,
    })
}

export const getClientFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

export const updateClientInit = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

export const updateClientSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        updated: true,
    })
}

export const updateClientFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    })
}

export const updatePassword = (state, action) => {
    return updateObject(state, {
        loading: false,
        updatedPsw: true,
    })
}
export const setClientError = (state, action) => {
    return updateObject(state, {
        error: false,
    })
}

export const loginNewClient = (state, action) => {
    return updateObject(state, {
        cliente: action.client
    })
}

export const closeAlertClient = (state, action) => {
    return updateObject(state, {
        isAlert: false
    })
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENTE_PEDIDO_CANCELAR: return checkoutCancel(state, action);
        case actionTypes.CLIENTE_CREAR_CUENTA: return crearCuenta(state, action);
        case actionTypes.CLIENTE_FALLO_CREACION_CUENTA: return falloCreacionCuenta(state, action);
        case actionTypes.CLIENTE_INICIAR_CREACION: return iniciarCreacion(state, action);
        case actionTypes.OPEN_ADD_DEL_OPTIONS: return openSelectedProduct(state, action);
        case actionTypes.CLOSE_ADD_DEL_OPTIONS: return closeSelectedProduct(state, action);
        case actionTypes.ADD_ONE_TO_SELECTED_PRODUCT: return addOneToSelectedProduct(state, action);
        case actionTypes.DEL_ONE_TO_SELECTED_PRODUCT: return delOneToSelectedProduct(state, action);
        case actionTypes.CLIENTE_MODAL_ORDEN_ABRIR: return openOrderModal(state, action);
        case actionTypes.CLIENTE_MODAL_ORDEN_CERRAR: return closeOrderModal(state, action);
        case actionTypes.CHECKOUT_COMPLETE: return checkoutComplete(state, action);
        case actionTypes.CHECKOUT_FAIL: return checkoutFail(state, action);
        case actionTypes.CHECKOUT_INIT: return checkoutInit(state, action);
        case actionTypes.CLIENTE_VER_NEGOCIOS: return getBusinessesSuccess(state, action);
        case actionTypes.GET_CLIENT_INIT: return getClientInit(state, action);
        case actionTypes.GET_CLIENT_SUCCESS: return getClientSuccess(state, action);
        case actionTypes.GET_CLIENT_FAIL: return getClientFail(state, action);
        case actionTypes.UPDATE_CLIENT_INIT: return updateClientInit(state, action);
        case actionTypes.UPDATE_CLIENT_SUCCESS: return updateClientSuccess(state, action);
        case actionTypes.UPDATE_CLIENT_FAIL: return updateClientFail(state, action);
        case actionTypes.UPDATE_CLIENT_PASSWORD: return updatePassword(state, action);
        case actionTypes.SET_CLIENT_ERROR: return setClientError(state, action);
        case actionTypes.LOGIN_NEW_CLIENT: return loginNewClient(state, action);
        case actionTypes.CLOSE_ALERT_CLIENT: return closeAlertClient(state, action);
        case actionTypes.CLIENT_CLICK_LOGO: return clientClickLogo(state, action);
        case actionTypes.SET_ORDER_COORDINATES: return setCoordinates(state, action);
        default: return state;
    }
};

export default reducer;