import * as actionType from './actionTypes';


export const clickOnBusiness = () => {
    return {
        type: actionType.SELECTION_MODAL_BUSINESS
    }
}

export const clickOnCustomer = () => {
    return {
        type: actionType.SELECTION_MODAL_CUSTOMER
    }
}