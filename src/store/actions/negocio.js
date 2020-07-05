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
            axios.get(process.env.REACT_APP_API_URL + `/business/getNegocio/${id}`, createHeaders())
                .then(resp => {
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
        axios.post(process.env.REACT_APP_API_URL + `/business/updWithoutImage/${id}`, business, createHeaders())
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

        axios.patch(process.env.REACT_APP_API_URL + `/business/update/${id}`, business, createHeaders())
            .then(resp => {
                if (resp.status === 200) dispatch(updateComplete(business))
                else dispatch(updateFail())
            }).catch(err => dispatch(updateFail()))
    }
}
