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