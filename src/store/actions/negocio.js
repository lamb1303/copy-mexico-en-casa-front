import * as actionTypes from './actionTypes';
import { loadForm } from '../utility';
import axios from '../../axios';
import createHeaders from '../Util/headers/createHeaders';


export const openEditNegocio = () => {
    return {
        type: actionTypes.OPEN_EDIT_NEGOCIO
    }
}

export const closeEditNegocio = () => {
    return {
        type: actionTypes.CLOSE_EDIT_NEGOCIO
    }
}

export const changeEditMode = () => {
    return {
        type: actionTypes.EDIT_MODE
    }
}

export const closeEditMode = () => {
    return {
        type: actionTypes.CLOSE_EDIT_MODE
    }
}

export const saveChanges = (desc) => {
    return {
        type: actionTypes.SAVE_CHANGES,
        desc: desc
    }
}

export const openEditProduct = (prodToEdit) => {
    return {
        type: actionTypes.OPEN_EDIT_PRODUCT,
        prodToEdit: prodToEdit
    }
}

export const closeEditProduct = () => {
    return {
        type: actionTypes.CLOSE_EDIT_PRODUCT
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
        dispatch(loadingPedido());
        if (Object.keys(checkedOrders).length !== 0) {
            const orderIds = []
            Object.keys(checkedOrders).forEach(order => {
                orderIds.push(checkedOrders[order].orderId)
            })
            const orderId = {
                orders: orderIds,
                stage: 'prepareOrders'
            };

            axios.post(`${process.env.REACT_APP_API_URL}/business/updateOrder`, orderId)
                .then(resp => {
                    if (resp.data.message === 'ALL ORDERS UPDATED') {
                        dispatch(empezarPed());
                    }
                })
                .catch(err => dispatch(changeStageFail()))
        }
    }
}

export const terminarPedido = (checkedPrepare) => {
    return dispatch => {
        dispatch(loadingPedido())
        if (Object.keys(checkedPrepare).length !== 0) {
            const orderIds = [];
            Object.keys(checkedPrepare).forEach(order => {
                orderIds.push(checkedPrepare[order].orderId)
            });

            const orderId = {
                orders: orderIds,
                stage: 'readyOrders'
            };

            axios.post(`${process.env.REACT_APP_API_URL}/business/updateOrder`, orderId)
                .then(resp => {
                    if (resp.data.message === 'ALL ORDERS UPDATED') {
                        dispatch(terminarPed())
                    }
                })
                .catch(err => dispatch(changeStageFail()))
        }
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

        const negId = 'ng1'

        axios.get(`${process.env.REACT_APP_API_URL}/business/pedidos/${negId}`)
            .then(resp => {
                if (resp.data.message === 'SEND ORDERS' || resp.data.message === 'EMPTY ORDER') {
                    dispatch(getPedidosSuccess(resp.data.receivedOrders))
                } else {
                    dispatch(getPedidosFail())
                }
            })
            .catch(err => dispatch(getPedidosFail()))
    }
}

export const getPedidoPreparing = (negocioId) => {
    return dispatch => {
        dispatch(getPedidosInit());

        const negId = 'ng1'

        axios.get(`${process.env.REACT_APP_API_URL}/business/pedidos/preparando/${negId}`)
            .then(resp => {
                if (resp.data.message === 'SEND ORDERS' || resp.data.message === 'EMPTY ORDER') {
                    dispatch(getPrepareSuccess(resp.data.prepareOrders))
                } else {
                    dispatch(getPedidosFail())
                }
            })
            .catch(err => dispatch(getPedidosFail()))
    }
}

export const getPedidoReady = (negocioId) => {
    return dispatch => {
        dispatch(getPedidosInit());

        const negId = 'ng1'

        axios.get(`${process.env.REACT_APP_API_URL}/business/pedidos/ready/${negId}`)
            .then(resp => {
                if (resp.data.message === 'SEND ORDERS' || resp.data.message === 'EMPTY ORDER') {
                    dispatch(getFinishSuccess(resp.data.readyOrders))
                } else {
                    dispatch(getPedidosFail())
                }
            })
            .catch(err => dispatch(getPedidosFail()))
    }
}

export const clickAddProduct = () => {
    return {
        type: actionTypes.BUSINESS_CLICK_ADD_PRODUCT
    }
}

export const loadNegocio = (negocioIds) => {
    return {
        type: actionTypes.LOAD_NEGOCIO,
        token: negocioIds.token,
        id: negocioIds.id
    }
}

export const initGetNegocioDetails = () => {
    return {
        type: actionTypes.INIT_GET_NEGOCIO_DETAILS
    }
}

export const getNegocioDetailsSuccess = (negocio) => {
    return {
        type: actionTypes.GET_NEGOCIO_DETAILS_SUCCESS,
        ...negocio
    }
}

export const getNegocioDetailsFail = () => {
    return {
        type: actionTypes.GET_NEGOCIO_DETAILS_FAIL
    }
}

const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_ALL_PRODUCTS,
        products: products
    }
}

export const getNegocioDetails = (id) => {
    return dispatch => {
        dispatch(initGetNegocioDetails());
        if (id === null) id = JSON.parse(localStorage.getItem('user')).id
        if (id !== null) {
            axios.get(process.env.REACT_APP_API_URL + `/business/getNegocio/${id}`)
                .then(resp => {
                    console.log(resp.data)
                    dispatch(getNegocioDetailsSuccess({ ...resp.data }))
                    dispatch(getProductsSuccess(resp.data.products))
                })
                .catch(err => {
                    dispatch(getNegocioDetailsFail())
                })
        }
        else {
            dispatch(getNegocioDetailsFail())
        }
    }
}

export const cancelEdit = () => {
    return {
        type: actionTypes.CANCEL_EDIT_BUSINESS
    }
}

export const updateInit = () => {
    return {
        type: actionTypes.EDIT_INIT
    }
}

export const updateEnd = (updates) => {

    return {
        type: actionTypes.EDIT_END,
        updates
    }
}

export const EditBusinessWithPhoto = (business, id) => {
    return dispatch => {
        dispatch(updateInit());
        const formData = loadForm(business);
        axios.post(process.env.REACT_APP_API_URL + `/business/updWithImage/${id}`, formData, createHeaders({
            'content-type': `multipart/form-data  boundary=${formData._boundary}`
        }))
            .then(resp => {
                business['image'] = resp.data.imageUrl
                dispatch(updateEnd(business))
            })
            .catch(err => {
                dispatch(updateEnd(business))
            })
    }
}

export const EditBusinessWithoutPhoto = (business, id) => {
    return dispatch => {
        dispatch(updateInit());
        axios.post(process.env.REACT_APP_API_URL + `/business/updWithoutImage/${id}`, business)
            .then(_ => dispatch(updateEnd(business)))
            .catch(_ => dispatch(updateEnd(business)))
    }
}

export const updateFail = () => {
    return {
        type: actionTypes.UPDATE_FAIL
    }
}

export const updateComplete = (updatedBusiness) => {
    return {
        type: actionTypes.UPDATE_COMPLETE,
        updatedBusiness
    }
}

export const updateBusiness = (business, id) => {

    return dispatch => {
        dispatch(updateInit());

        axios.patch(process.env.REACT_APP_API_URL + `/business/update/${id}`, business)
            .then(resp => {
                if (resp.status === 200) dispatch(updateComplete(business))
                else dispatch(updateFail())
            }).catch(err => dispatch(updateFail()))
    }
}

