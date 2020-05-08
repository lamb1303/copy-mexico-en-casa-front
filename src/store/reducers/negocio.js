import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    editMode: false,
    getPedidosloading: false,
    selectedNegocio: {
        name: 'El nombre',
        desc: 'Esta es la tienda de la señora tencha! donde vera las mejores tortas jaja'
    },
    editProduct: false,
    prodToEdit: null,
    addProductClicked: false,
    selectedProduct: null,
    orders: true,
    preparing: false,
    ready: false,
    loading: false,
    error: false,
    receivedOrders:
    {
        cl1: {
            stage: 'receivedOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    name: 'Algo mas',
                    amount: 2
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek',
            metodoEntrega: 'Local',
            date: '2/5/2020 0:22:00',
            clientId: 'cl1',
            metodoPago: 'Efectivo',
            orderId: '7f3bca28-3335-4176-92de-39139898b116',
            checked: false
        },
        cl2: {
            metodoPago: 'Efectivo',
            stage: 'receivedOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    amount: 2,
                    name: 'Algo mas'
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek',
            metodoEntrega: 'Local',
            date: '3/5/2020 14:54:17',
            clientId: 'cl2',
            orderId: '9c38168a-66e9-423c-bd08-d24801efb690',
            checked: false
        }
    },
    prepareOrders: {},
    readyOrders: {
        cl1: {
            stage: 'readyOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    name: 'Algo mas',
                    amount: 2
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek',
            metodoEntrega: 'Local',
            date: '2/5/2020 0:22:00',
            clientId: 'cl1',
            metodoPago: 'Efectivo',
            orderId: '7f3bca28-3335-4176-92de-39139898b116',
            checked: false
        },
        cl2: {
            stage: 'readyOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    name: 'Algo mas',
                    amount: 2
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek Tercero',
            metodoEntrega: 'Local',
            date: '2/5/2020 0:22:00',
            clientId: 'cl2',
            metodoPago: 'Efectivo',
            orderId: '7f3bca28-3335-4176-92de-39139898b116',
            checked: false
        },
        cl3: {
            stage: 'readyOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    name: 'Algo mas',
                    amount: 2
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek',
            metodoEntrega: 'Local',
            date: '2/5/2020 0:22:00',
            clientId: 'cl1',
            metodoPago: 'Efectivo',
            orderId: '7f3bca28-3335-4176-92de-39139898b116',
            checked: false
        },
        cl4: {
            stage: 'readyOrders',
            negocioId: 'ng1',
            products: {
                productId3: {
                    name: 'Algo mas',
                    amount: 2
                },
                productId1: {
                    name: 'Amborguesa',
                    amount: 2
                },
                productId2: {
                    name: 'Taquitos',
                    amount: 2
                }
            },
            name: 'Shrek Tercero',
            metodoEntrega: 'Local',
            date: '2/5/2020 0:22:00',
            clientId: 'cl2',
            metodoPago: 'Efectivo',
            orderId: '7f3bca28-3335-4176-92de-39139898b116',
            checked: false
        },
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

const clickAddProduct = (state, action) => {
    return updateObject(state, {
        addProductClicked: !state.addProductClicked
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
        checkedOrders: {},
        loading: false
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
        checkedPrepare: {},
        loading: false
    })
}

const getPedidosInit = (state, action) => {
    return updateObject(state, {
        getPedidosloading: true
    })
}

const getPedidosSuccess = (state, action) => {
    return updateObject(state, {
        getPedidosloading: false,
        receivedOrders: action.ordenes
    })
}

const getPrepareSuccess = (state, action) => {
    return updateObject(state, {
        getPedidosloading: false,
        prepareOrders: action.prepare
    })
}

const getFinishSuccess = (state, action) => {
    return updateObject(state, {
        getPedidosloading: false,
        readyOrders: action.ready
    })
}

const getPedidosFail = (state, action) => {
    return updateObject(state, {
        getPedidosloading: false
    })
}

const loadingPedido = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const changeStageFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
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
        case actionTypes.GET_PEDIDOS_INIT: return getPedidosInit(state, action);
        case actionTypes.GET_PEDIDOS_SUCCESS: return getPedidosSuccess(state, action);
        case actionTypes.GET_PEDIDOS_NEGOCIO_ID_FAIL: return getPedidosFail(state, action);
        case actionTypes.GET_PREPARING_SUCCESS: return getPrepareSuccess(state, action);
        case actionTypes.GET_READY_SUCCESS: return getFinishSuccess(state, action);
        case actionTypes.LOADING_PEDIDOS: return loadingPedido(state, action);
        case actionTypes.CHANGE_STAGE_FAIL: return changeStageFail(state, action);
        case actionTypes.BUSINESS_CLICK_ADD_PRODUCT: return clickAddProduct(state, action);
        default: return state
    }
}
export default reducer;