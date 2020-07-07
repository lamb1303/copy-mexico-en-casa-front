import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    id: null,
    negocio: {},
    products: [],
    editMode: false,
    getPedidosloading: false,
    selectedNegocio: {},
    prodToEdit: null,
    loading: false,
    error: false,
    updated: false,
    updatedPsw: false,
}

const clienteSelectedBusiness = (state, action) => {
    return updateObject(state, {
        selectedNegocio: action.business
    })
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

const closeEditMode = (state, action) => {
    return updateObject(state, {
        editMode: false
    })
}

const changeStageFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    })
}

const loadNegocio = (state, action) => {
    return updateObject(state, {
        token: action.token,
        id: action.id
    })
}

const initGetNegocioDetails = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const getNegocioDetailsSuccess = (state, action) => {

    return updateObject(state, {
        loading: false,
        selectedNegocio: action.details,
        // products: action.products,
        updatedPsw: false,
        updated: false
    })
}

const getNegocioDetailsFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const cancelEdit = (state, action) => {
    return updateObject(state, {
        editMode: false
    })
}

const editInit = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const editEnd = (state, action) => {

    if (action.updates.image) {
        return updateObject(state, {
            loading: false,
            editMode: false,
            selectedNegocio: {
                ...state.selectedNegocio,
                photoBusiness: action.updates.image,
                businessDesc: action.updates.businessDesc,
                businessName: action.updates.businessName
            }
        })
    } else {
        return updateObject(state, {
            loading: false,
            editMode: false,
            selectedNegocio: {
                ...state.selectedNegocio,
                businessDesc: action.updates.businessDesc,
                businessName: action.updates.businessName
            }
        })
    }
}


const updateFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}

const updateComplete = (state, action) => {
    return updateObject(state, {
        loading: false,
        updated: true,
        selectedNegocio: updateObject(state.selectedNegocio, action.updatedBusiness),
    })
}

const updateBusinessPassword = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: false,
        updatedPsw: true,
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_EDIT_NEGOCIO: return openEditNegocio(state, action);
        case actionTypes.CLOSE_EDIT_NEGOCIO: return closeEditNegocio(state, action);
        case actionTypes.EDIT_MODE: return changeEditMode(state, action);
        case actionTypes.SAVE_CHANGES: return saveChanges(state, action);
        case actionTypes.CLOSE_EDIT_MODE: return closeEditMode(state, action);
        case actionTypes.CHANGE_STAGE_FAIL: return changeStageFail(state, action);
        case actionTypes.CLIENTE_SET_SELECTED_BUSINESS: return clienteSelectedBusiness(state, action);
        case actionTypes.LOAD_NEGOCIO: return loadNegocio(state, action);
        case actionTypes.INIT_GET_NEGOCIO_DETAILS: return initGetNegocioDetails(state, action);
        case actionTypes.GET_NEGOCIO_DETAILS_SUCCESS: return getNegocioDetailsSuccess(state, action);
        case actionTypes.GET_NEGOCIO_DETAILS_FAIL: return getNegocioDetailsFail(state, action);
        case actionTypes.CANCEL_EDIT_BUSINESS: return cancelEdit(state, action);
        case actionTypes.EDIT_INIT: return editInit(state, action);
        case actionTypes.EDIT_END: return editEnd(state, action);
        case actionTypes.UPDATE_COMPLETE: return updateComplete(state, action);
        case actionTypes.UPDATE_FAIL: return updateFail(state, action);
        case actionTypes.UPDATE_BUSINESS_PASSWORD: return updateBusinessPassword(state, action);

        default: return state
    }
}
export default reducer;