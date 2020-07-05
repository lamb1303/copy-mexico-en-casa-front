import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as alertTypes from '../Util/enums/alertTypes';

const initialState = {
    isAlert: false,
    alertType: '',
    message: "",
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
    businesses: {},
    totalAmount: 0,
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

const closeOrderModal = (state, action) => {
    return updateObject(state, {
        openOrder: false
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
        let copy = state.productCount.filter(x => x.name !== action.product)

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
        totalAmount: 0
    })
}

export const checkoutCancel = (state, action) => {
    return updateObject(state, {
        checkoutInit: false,
        productCount: [],
        orderPrice: 0,
        totalAmount: 0
    })
}

export const checkoutFail = (state, action) => {
    return updateObject(state, {
        checkoutInit: false,
        checkoutError: action.error
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
        default: return state;
    }
};

export default reducer;