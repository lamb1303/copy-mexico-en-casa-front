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
    selectedProduct: null
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_EDIT_NEGOCIO: return openEditNegocio(state, action);
        case actionTypes.CLOSE_EDIT_NEGOCIO: return closeEditNegocio(state, action);
        case actionTypes.EDIT_MODE: return changeEditMode(state, action);
        case actionTypes.SAVE_CHANGES: return saveChanges(state, action);
        case actionTypes.OPEN_EDIT_PRODUCT: return openEditProduct(state, action);
        case actionTypes.CLOSE_EDIT_PRODUCT: return closeEditProduct(state, action);
        case actionTypes.CLOSE_EDIT_MODE: return closeEditMode(state, action);
        default: return state
    }
}
export default reducer;