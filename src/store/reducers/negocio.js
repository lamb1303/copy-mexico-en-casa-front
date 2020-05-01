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
    receivedOrders: {
        cl1: {
            name: "Maria",
            products: {
                productId1: {
                    name: "Pizza",
                    amount: 1
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2
                },
                productId3: {
                    name: "Tacos",
                    amount: 4
                }
            },
            checked: false,
            telefono: 894548548,
            ubicacion: ""
        },
        cl2: {
            name: "Miguel",
            products: {
                productId1: {
                    name: "Torta",
                    amount: 2
                },
                "productId2": {
                    name: "Amborguesa",
                    amount: 2
                }
            },
            checked: false
        },
        cl3: {
            name: "Juan",
            products: {
                productId1: {
                    name: "Pizza",
                    amount: 1
                }
            },
            checked: false
        }
    },
    prepareOrders: {
        cl4: {
            name: "Shrek",
            products: {
                productId1: {
                    name: "Tacos",
                    amount: 5
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2
                }
            },
            checked: false
        },
        cl5: {
            name: "Donald",
            products: {
                productId1: {
                    name: "Gorditas",
                    amount: 3
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2
                }
            },
            checked: false
        }
    },
    readyOrders: {
        cl6: {
            name: "El barto",
            products: {
                productId1: {
                    name: "Torta",
                    amount: 3
                },
                productId2: {
                    name: "Tacos",
                    amount: 2
                }
            },
            checked: false
        }
    },
    checkedOrders: {},
    checkedPrepare: {}
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

const checkPreparedOrder = (state, action) => {

    const updatedClient = updateObject(state.prepareOrders[action.clientId], {
        checked: action.checked
    })

    const orders = updateObject(state.prepareOrders, {
        [action.clientId]: updatedClient
    });

    let checked = { ...state.checkedPrepare }
    if (action.checked) {
        const newUpdatedClient = { ...updatedClient }
        newUpdatedClient.checked = false;
        checked = updateObject(state.checkedPrepare, {
            [action.clientId]: newUpdatedClient
        })
    } else {
        delete checked[action.clientId]
    }

    return updateObject(state, {
        prepareOrders: orders,
        checkedPrepare: checked
    })
}

const checkReceivedOrder = (state, action) => {

    const updatedClient = updateObject(state.receivedOrders[action.clientId], {
        checked: action.checked
    })

    const orders = updateObject(state.receivedOrders, {
        [action.clientId]: updatedClient
    });

    let checked = { ...state.checkedOrders }
    if (action.checked) {
        const newUpdatedClient = { ...updatedClient };
        newUpdatedClient.checked = false;
        checked = updateObject(state.checkedOrders, {
            [action.clientId]: newUpdatedClient
        })
    } else {
        delete checked[action.clientId]
    }
    return updateObject(state, {
        receivedOrders: orders,
        checkedOrders: checked
    })

}

const empezarPedido = (state, action) => {
    const receivedOrders = { ...state.receivedOrders };
    Object.keys(state.checkedOrders).forEach(clientId => delete receivedOrders[clientId]);

    let prepareOrders = { ...state.prepareOrders };
    Object.keys(state.checkedOrders).forEach(clientId => {
        prepareOrders = updateObject(prepareOrders, {
            [clientId]: state.checkedOrders[clientId]
        })
    })


    return updateObject(state, {
        receivedOrders: receivedOrders,
        prepareOrders: prepareOrders,
        checkedOrders: {}
    });
}

const terminarPedido = (state, action) => {
    const prepareOrders = { ...state.prepareOrders };
    Object.keys(state.checkedPrepare).forEach(clientId => delete prepareOrders[clientId]);

    let readyOrders = { ...state.readyOrders };
    Object.keys(state.checkedPrepare).forEach(clientId => {
        readyOrders = updateObject(readyOrders, {
            [clientId]: state.checkedPrepare[clientId]
        })
    })

    return updateObject(state, {
        prepareOrders: prepareOrders,
        readyOrders: readyOrders,
        checkedPrepare: {}
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
        case actionTypes.CHECKED_PREPARING_ORDER: return checkPreparedOrder(state, action);
        case actionTypes.CHECKED_RECEIVED_ORDER: return checkReceivedOrder(state, action);
        case actionTypes.EMPEZAR_PEDIDO: return empezarPedido(state, action);
        case actionTypes.TERMINAR_PEDIDO: return terminarPedido(state, action);
        default: return state
    }
}
export default reducer;