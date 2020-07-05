import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {

    orders: true,
    preparing: false,
    ready: false,
    entregado: false,
    loading: false,
    isAlert: false,
    alertType: '',
    message: "",
    receivedOrders: {},
    prepareOrders: {},
    readyOrders: {},
    checkedOrders: {},
    checkedPrepare: {},
    checkedDeliver: {},
    viewCommentsModal: false,
    selectedOrder:{},
}

export const openAlert = (state, action) => {
    return updateObject(state, {
        isAlert: true,
        ...action
    });
}

export const closeAlert = (state, action) => {
    return updateObject(state, {
        isAlert: false,
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


const checkDeriveredOrder = (state, action) => {

    const updatedClient = updateObject(state.readyOrders[action.clientId], {
        checked: action.checked
    })

    const orders = updateObject(state.readyOrders, {
        [action.clientId]: updatedClient
    });

    let checked = { ...state.checkedDeliver }
    if (action.checked) {
        const newUpdatedClient = { ...updatedClient }
        newUpdatedClient.checked = false;
        checked = updateObject(state.checkedDeliver, {
            [action.clientId]: newUpdatedClient
        })
    } else {
        delete checked[action.clientId]
    }

    return updateObject(state, {
        readyOrders: orders,
        checkedDeliver: checked
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

const entregarPedido = (state, action) => {
    const readyOrders = { ...state.readyOrders };
    Object.keys(state.checkedDeliver).forEach(clientId => delete readyOrders[clientId]);

    return updateObject(state, {
        readyOrders: readyOrders,
        checkedDeliver: {},
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

const openViewComments = (state, action) => {

    return updateObject(state, {
        viewCommentsModal: true,
        selectedOrder: action.selectedOrder,
    })

}

const closeViewComments = (state, action) => {
    return updateObject(state, {
        viewCommentsModal: false,
    })
}


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ORDERS_OPEN_ALERT: return openAlert(state, action);
        case actionTypes.ORDERS_CLOSE_ALERT: return closeAlert(state, action);
        case actionTypes.ORDERS_BUTTON_SELECTED: return orderButtonSelected(state, action);
        case actionTypes.PREPARE_BUTTON_SELECTED: return prepareButtonSelected(state, action);
        case actionTypes.READY_BUTTON_SELECTED: return readyButtonSelected(state, action);
        case actionTypes.CHECKED_DELIVERING_ORDER: return checkDeriveredOrder(state, action);
        case actionTypes.CHECKED_PREPARING_ORDER: return checkPreparedOrder(state, action);
        case actionTypes.CHECKED_RECEIVED_ORDER: return checkReceivedOrder(state, action);
        case actionTypes.EMPEZAR_PEDIDO: return empezarPedido(state, action);
        case actionTypes.TERMINAR_PEDIDO: return terminarPedido(state, action);
        case actionTypes.ENTREGAR_PEDIDO: return entregarPedido(state, action);
        case actionTypes.GET_PEDIDOS_INIT: return getPedidosInit(state, action);
        case actionTypes.GET_PEDIDOS_SUCCESS: return getPedidosSuccess(state, action);
        case actionTypes.GET_PEDIDOS_NEGOCIO_ID_FAIL: return getPedidosFail(state, action);
        case actionTypes.GET_PREPARING_SUCCESS: return getPrepareSuccess(state, action);
        case actionTypes.GET_READY_SUCCESS: return getFinishSuccess(state, action);
        case actionTypes.LOADING_PEDIDOS: return loadingPedido(state, action);
        case actionTypes.ORDERS_OPEN_VIEW_COMMENTS: return openViewComments(state,action);
        case actionTypes.ORDERS_CLOSE_VIEW_COMMENTS: return closeViewComments(state, action);
        default: return state;
    }

}

export default reducer;
