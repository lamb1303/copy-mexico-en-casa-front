import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    editMode: false,
    selectedNegocio: {
        name: 'El nombre',
        desc: 'Esta es la tienda de la señora tencha! donde vera las mejores tortas jaja'
    },
    editProduct: false,
    prodToEdit: null,
    selectedProduct: null,
    orders: true,
    preparing: false,
    ready: false,
    receivedOrders: [
        {
            clientName: 'Maria',
            mail: 'email',
            products: [
                {
                    name: 'Pizza',
                    amount: 1
                },
                {
                    name: 'Amborguesa',
                    amount: 2
                },
                {
                    name: 'Tacos',
                    amount: 4
                }
            ]
        },
        {
            clientName: 'Miguel',
            mail: 'email2',
            products: [
                {
                    name: 'Torta',
                    amount: 2
                },
                {
                    name: 'Amborguesa',
                    amount: 2
                }
            ]
        },
        {
            clientName: 'Juan',
            mail: 'email1',
            products: [
                {
                    name: 'Pizza',
                    amount: 1
                }
            ]
        }
    ],
    prepareOrders: [
        {
            clientName: 'Antonio',
            mail: 'emailg',
            products: [
                {
                    name: 'Gorditas',
                    amount: 5
                }
            ]
        }
    ],
    readyOrders: [
        {
            clientName: 'Elizabeth',
            mail: 'emailvbg',
            products: [
                {
                    name: 'Torta',
                    amount: 6
                },
                {
                    name: 'Jugo',
                    amount: 1
                }
            ]
        },
        {
            clientName: 'el Barto',
            mail: 'emails',
            products: [
                {
                    name: 'Amborguesa',
                    amount: 3
                },
                {
                    name: 'Pizza',
                    amount: 1
                }
            ]
        }
    ]
}

const changeEditMode = (state, action) => {
    return updateObject(state, {
        editMode: true
    })
}

const saveChanges = (state, action) => {
    const selectedNeg = updateObject(state.selectedNegocio, {
        desc: action.desc
    })
    return updateObject(state, {
        editMode: false,
        selectedNegocio: selectedNeg
    })
}

const openEditNegocio = (state, action) => {
    return updateObject(state, {
        editMode: true
    })
}

const closeEditNegocio = (state, action) => {
    return updateObject(state, {
        editMode: false
    })
}

const closeEditProduct = (state, action) => {
    return updateObject(state, {
        editProduct: false
    })
}

const openEditProduct = (state, action) => {
    return updateObject(state, {
        editProduct: true,
        selectedProduct: action.prodToEdit
    })
}

const closeEditMode = (state, action) => {
    return updateObject(state, {
        editMode: false
    })
}

const orderButtonSelected = (state, action) => {
    return updateObject(state, {
        orders: true,
        preparing: false,
        ready: false
    })
}

const prepareButtonSelected = (state, action) => {
    return updateObject(state, {
        orders: false,
        preparing: true,
        ready: false
    })
}

const readyButtonSelected = (state, action) => {
    return updateObject(state, {
        orders: false,
        preparing: false,
        ready: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_EDIT_NEGOCIO: return openEditNegocio(state, action);
        case actionTypes.CLOSE_EDIT_NEGOCIO: return closeEditNegocio(state, action);
        case actionTypes.EDIT_MODE: return changeEditMode(state, action);
        case actionTypes.SAVE_CHANGES: return saveChanges(state, action);
        case actionTypes.OPEN_EDIT_PRODUCT: return openEditProduct(state, action);
        case actionTypes.CLOSE_EDIT_PRODUCT: return closeEditProduct(state, action);
        case actionTypes.CLOSE_EDIT_MODE: return closeEditMode(state, action);
        case actionTypes.ORDERS_BUTTON_SELECTED: return orderButtonSelected(state, action);
        case actionTypes.PREPARE_BUTTON_SELECTED: return prepareButtonSelected(state, action);
        case actionTypes.READY_BUTTON_SELECTED: return readyButtonSelected(state, action);
        default: return state
    }
}
export default reducer;