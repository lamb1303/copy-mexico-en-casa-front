import * as actionTypes from './actionTypes';
import axios from 'axios';
import createHeaders from '../Util/headers/createHeaders';
import * as stageType from '../Util/enums/stageType';



const openAlert = (alertParameters) => {
    return {
        type: actionTypes.ORDERS_OPEN_ALERT,
        ...alertParameters,
    }
}


export const closeAlert = () => {
    return {
        type: actionTypes.ORDERS_CLOSE_ALERT,
    }
}

export const ordersButtonSelected = () => {
    return {
        type: actionTypes.ORDERS_BUTTON_SELECTED
    }
}

export const prepareButtonSelected = () => {
    return {
        type: actionTypes.PREPARE_BUTTON_SELECTED
    }
}

export const readyButtonSelected = () => {
    return {
        type: actionTypes.READY_BUTTON_SELECTED
    }
}

export const checkReceivedOrder = (checked, clientId) => {
    return {
        type: actionTypes.CHECKED_RECEIVED_ORDER,
        checked: checked,
        clientId: clientId
    }
}

export const checkPreparingOrder = (checked, clientId) => {
    return {
        type: actionTypes.CHECKED_PREPARING_ORDER,
        checked: checked,
        clientId: clientId
    }
}

export const checkDeliveringOrder = (checked, clientId) => {
    return {
        type: actionTypes.CHECKED_DELIVERING_ORDER,
        checked: checked,
        clientId: clientId
    }
}

export const empezarPed = () => {
    return {
        type: actionTypes.EMPEZAR_PEDIDO
    }
}

export const terminarPed = () => {
    return {
        type: actionTypes.TERMINAR_PEDIDO
    }
}

export const entregarPed = () => {
    return {
        type: actionTypes.ENTREGAR_PEDIDO,
    }
}



export const loadingPedido = () => {
    return {
        type: actionTypes.LOADING_PEDIDOS
    }
}

export const changeStageFail = () => {
    return {
        type: actionTypes.CHANGE_STAGE_FAIL
    }
}

export const empezarPedido = (checkedOrders) => {
    return dispatch => {
        if (Object.keys(checkedOrders).length === 0) return;
        // dispatch(loadingPedido());

        const orderIds = []
        const clientIds = [];
        Object.keys(checkedOrders).forEach(order => {
            orderIds.push(checkedOrders[order].orderId)
            clientIds.push(checkedOrders[order].idCustomer)
        })
        const orderId = {
            orders: orderIds,
            clientIds: clientIds,
            stage: stageType.prepareOrders,
        };

        axios.patch(`${process.env.REACT_APP_API_URL}/orders/updateOrder`, orderId, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(empezarPed());
                        const alertParams = {
                            alertType: 'Success',
                            message: 'La order esta en preparación',
                        }
                        dispatch(openAlert(alertParams));
                        break;

                    default:
                        dispatch(changeStageFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}



const accessDeny = (message) => {
    return {
        type: actionTypes.HOME_LOGOUT,
    }
}

export const terminarPedido = (checkedPrepare) => {
    return dispatch => {
        if (Object.keys(checkedPrepare).length === 0) return;

        dispatch(loadingPedido())
        const orderIds = [];
        const clientIds = [];
        Object.keys(checkedPrepare).forEach(order => {
            orderIds.push(checkedPrepare[order].orderId)
            clientIds.push(checkedPrepare[order].idCustomer)
        });

        const orderId = {
            orders: orderIds,
            clientIds: clientIds,
            stage: stageType.readyOrders,
        };

        axios.patch(`${process.env.REACT_APP_API_URL}/orders/updateOrder`, orderId, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(terminarPed());
                        const alertParams = {
                            alertType: 'Success',
                            message: 'La order esta lista',
                        }
                        dispatch(openAlert(alertParams));
                        break;

                    default:
                        dispatch(changeStageFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}

export const entregarPedido = (checkedPrepare) => {
    return dispatch => {
        if (Object.keys(checkedPrepare).length === 0) return;

        dispatch(loadingPedido())
        const orderIds = [];
        const clientIds = [];

        Object.keys(checkedPrepare).forEach(order => {
            orderIds.push(checkedPrepare[order].orderId)
            clientIds.push(checkedPrepare[order].idCustomer)
        });

        const orderId = {
            orders: orderIds,
            clientIds: clientIds,
            stage: stageType.deliveredOrders,
        };

        axios.patch(`${process.env.REACT_APP_API_URL}/orders/updateOrder`, orderId, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(entregarPed());
                        const alertParams = {
                            alertType: 'Success',
                            message: 'La order fue entregada',
                        }
                        dispatch(openAlert(alertParams));
                        break;

                    default:
                        dispatch(changeStageFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}

export const getPedidosInit = () => {
    return {
        type: actionTypes.GET_PEDIDOS_INIT
    }
}

export const getPedidosSuccess = (ordenes) => {
    return {
        type: actionTypes.GET_PEDIDOS_SUCCESS,
        ordenes: ordenes
    }
}

export const getPrepareSuccess = (prepare) => {
    return {
        type: actionTypes.GET_PREPARING_SUCCESS,
        prepare: prepare
    }
}

export const getFinishSuccess = (ready) => {
    return {
        type: actionTypes.GET_READY_SUCCESS,
        ready: ready
    }
}


export const getPedidosFail = () => {
    return {
        type: actionTypes.GET_PEDIDOS_NEGOCIO_ID_FAIL
    }
}

export const getPedidoNegocioId = (negocioId) => {
    return dispatch => {
        dispatch(getPedidosInit());


        axios.get(`${process.env.REACT_APP_API_URL}/orders/${negocioId}`, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(getPedidosSuccess(resp.data.receivedOrders));
                        break;

                    default:
                        dispatch(getPedidosFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}

export const getPedidoPreparing = (negocioId) => {
    return dispatch => {
        dispatch(getPedidosInit());

        axios.get(`${process.env.REACT_APP_API_URL}/orders/preparando/${negocioId}`, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(getPrepareSuccess(resp.data.prepareOrders))
                        break;

                    default:
                        dispatch(getPedidosFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}

export const getPedidoReady = (negocioId) => {
    return dispatch => {
        dispatch(getPedidosInit());

        axios.get(`${process.env.REACT_APP_API_URL}/orders/ready/${negocioId}`, createHeaders())
            .then(resp => {
                switch (resp.status) {
                    case 201:
                        dispatch(getFinishSuccess(resp.data.readyOrders))
                        break;

                    default:
                        dispatch(getPedidosFail());
                        break;
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(openAlert({
                        alertType: 'Error',
                        message: error.response.data.message,
                    }));
                    if (error.response.status === 403) {
                        setTimeout(
                            () => { dispatch(accessDeny(error.response.data.message)) }, 3000);
                    }
                }
            });
    }
}

export const openViewComments = (selectedOrder) => {
    return {
        type: actionTypes.ORDERS_OPEN_VIEW_COMMENTS,
        selectedOrder: selectedOrder,
    }
}

export const closeViewComments = () => {
    return {
        type: actionTypes.ORDERS_CLOSE_VIEW_COMMENTS,
    }
}
