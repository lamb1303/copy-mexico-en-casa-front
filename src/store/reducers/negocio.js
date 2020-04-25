import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    editMode: true,
    selectedNegocio: {
        name: 'El nombre',
        desc: 'Esta es la tienda de la señora tencha! donde vera las mejores tortas jaja'
    }
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_EDIT_NEGOCIO: return openEditNegocio(state, action);
        case actionTypes.CLOSE_EDIT_NEGOCIO: return closeEditNegocio(state, action);
        default: return state
    }
}
export default reducer;