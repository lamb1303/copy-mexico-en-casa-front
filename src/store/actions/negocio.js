import * as actionTypes from './actionTypes';

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

export const empezarPedido = () => {
    return {
        type: actionTypes.EMPEZAR_PEDIDO
    }
}

export const terminarPedido = () => {
    return {
        type: actionTypes.TERMINAR_PEDIDO
    }
}