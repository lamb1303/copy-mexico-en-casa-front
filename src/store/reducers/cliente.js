import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: false,
    loading: false,
    cliente: false,
    openProduct: false,
    selectedProduct: '',
    productCount: [],
    checkoutInit: false,
    orderPrice: 0,
    openOrder: false,
    deliver: null,
    payment: null,
    checkoutError: null
}

const cancelOrder = (state, action) => {
    return updateObject(state, {
        deliver: null,
        payment: null,
        productCount: [],
        orderPrice: 0,
        openOrder: false
    })
}

const backToDeliver = (state, action) => {
    return updateObject(state, {
        deliver: null,
        payment: null
    })
}
const cashPayment = (state, action) => {
    return updateObject(state, {
        payment: 'Efectivo'
    })
}

const creditCardPayment = (state, action) => {
    return updateObject(state, {
        payment: 'Tarjeta'
    })

}

const orderToGo = (state, action) => {
    return updateObject(state, {
        deliver: true
    })
}

const orderToPickUp = (state, action) => {
    return updateObject(state, {
        deliver: false
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
        selectedProduct: action.product
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
        let copy = state.productCount.filter(x => x.name !== action.product);

        //add 1 to the selected product
        // const newProduct = {
        //     ...product,
        //     count: product.count + 1
        // };

        const newProduct = updateObject(product, {
            count: product.count + 1
        })

        //add into the items the product + 1
        copy.push(newProduct)

        //update the state
        const newPrice = state.orderPrice + action.price
        return updateObject(state, {
            productCount: copy,
            orderPrice: newPrice
        })
    } else {
        const newProduct = {
            name: action.product,
            count: 1
        }
        const newPrice = state.orderPrice + action.price
        return updateObject(state, {
            productCount: [...state.productCount, newProduct],
            orderPrice: newPrice,
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
            count: product.count - 1
        };

        //add into the items the product - 1
        copy.push(newProduct)

        //update the state
        const newPrice = state.orderPrice - action.price;
        return updateObject(state, {
            productCount: copy,
            orderPrice: newPrice
        })
    }
}

export const checkoutInit = (state, action) => {
    return updateObject(state, {
        checkoutInit: true
    })
}

export const checkoutComplete = (state, action) => {
    return updateObject(state, {
        checkoutInit: false
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
        case actionTypes.CLIENTE_CREAR_CUENTA: return crearCuenta(state, action);
        case actionTypes.CLIENTE_FALLO_CREACION_CUENTA: return falloCreacionCuenta(state, action);
        case actionTypes.CLIENTE_INICIAR_CREACION: return iniciarCreacion(state, action);
        case actionTypes.OPEN_ADD_DEL_OPTIONS: return openSelectedProduct(state, action);
        case actionTypes.CLOSE_ADD_DEL_OPTIONS: return closeSelectedProduct(state, action);
        case actionTypes.ADD_ONE_TO_SELECTED_PRODUCT: return addOneToSelectedProduct(state, action);
        case actionTypes.DEL_ONE_TO_SELECTED_PRODUCT: return delOneToSelectedProduct(state, action);
        case actionTypes.CLIENTE_MODAL_ORDEN_ABRIR: return openOrderModal(state, action);
        case actionTypes.CLIENTE_MODAL_ORDEN_CERRAR: return closeOrderModal(state, action);
        case actionTypes.CLIENTE_PEDIDO_CASA: return orderToGo(state, action);
        case actionTypes.CLIENTE_PEDIDO_RECOGER: return orderToPickUp(state, action);
        case actionTypes.CLIENTE_PAGO_EFECTIVO: return cashPayment(state, action);
        case actionTypes.CLIENTE_PAGO_TARJETA: return creditCardPayment(state, action);
        case actionTypes.CLIENTE_REGRESAR_OPCION_PEDIDO: return backToDeliver(state, action);
        case actionTypes.CLIENTE_PEDIDO_CANCELAR: return cancelOrder(state, action);
        case actionTypes.CHECKOUT_COMPLETE: return checkoutComplete(state, action);
        case actionTypes.CHECKOUT_FAIL: return checkoutFail(state, action);
        case actionTypes.CHECKOUT_INIT: return checkoutInit(state, action);
        default: return state;
    }
};

export default reducer;