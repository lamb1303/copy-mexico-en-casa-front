import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: false,
    loading: false,
    cliente: true,
    openProduct: false,
    selectedProduct: '',
    productCount: []
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
        const newProduct = {
            ...product,
            count: product.count + 1
        };

        //add into the items the product + 1
        copy.push(newProduct)

        //update the state
        return updateObject(state, {
            productCount: copy
        })
    } else {
        const newProduct = {
            name: action.product,
            count: 1
        }
        return updateObject(state, {
            productCount: [...state.productCount, newProduct]
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
        return updateObject(state, {
            productCount: copy
        })
    }
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
        default: return state;
    }
};

export default reducer;