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
                    amount: 1,
                    checked: false
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2,
                    checked: false
                },
                productId3: {
                    name: "Tacos",
                    amount: 4,
                    checked: false
                }
            }
        },
        cl2: {
            name: "Miguel",
            products: {
                productId1: {
                    name: "Torta",
                    amount: 2,
                    checked: false
                },
                "productId2": {
                    name: "Amborguesa",
                    amount: 2,
                    checked: false
                }
            }
        },
        cl3: {
            name: "Juan",
            products: {
                productId1: {
                    name: "Pizza",
                    amount: 1,
                    checked: false
                }
            }
        }
    },
    prepareOrders: {
        cl4: {
            name: "Shrek",
            products: {
                productId1: {
                    name: "Tacos",
                    amount: 5,
                    checked: false
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2,
                    checked: false
                }
            }
        },
        cl5: {
            name: "Donald",
            products: {
                productId1: {
                    name: "Gorditas",
                    amount: 3,
                    checked: false
                },
                productId2: {
                    name: "Amborguesa",
                    amount: 2,
                    checked: false
                }
            }
        }
    },
    readyOrders: {
        cl6: {
            name: "El barto",
            products: {
                productId1: {
                    name: "Torta",
                    amount: 3,
                    checked: false
                },
                productId2: {
                    name: "Tacos",
                    amount: 2,
                    checked: false
                }
            }
        }
    }
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

    const orders = updateObject(state.prepareOrders, {
        [action.clientId]: updateObject(state.prepareOrders[action.clientId], {
            products: updateObject(state.prepareOrders[action.clientId].products, {
                [action.prodId]: updateObject(state.prepareOrders[action.clientId].products[action.prodId], {
                    checked: action.checked
                })
            })
        })
    });
    return updateObject(state, {
        prepareOrders: orders
    })
}

const checkReceivedOrder = (state, action) => {

    const orders = updateObject(state.receivedOrders, {
        [action.clientId]: updateObject(state.receivedOrders[action.clientId], {
            products: updateObject(state.receivedOrders[action.clientId].products, {
                [action.prodId]: updateObject(state.receivedOrders[action.clientId].products[action.prodId], {
                    checked: action.checked
                })
            })
        })
    });

    return updateObject(state, {
        receivedOrders: orders
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
        default: return state
    }
}
export default reducer;