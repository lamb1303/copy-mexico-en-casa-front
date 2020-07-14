import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as alertTypes from '../../store/Util/enums/alertTypes';
import createHeaders from '../Util/headers/createHeaders';

export const clientGetOrdersSuccess = (orders) => {
    return {
        type: actionTypes.CLIENT_GET_ORDERS_SUCCESS,
        orders: orders
    }
}

export const clientGetOrders = (idCusotmer) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/customer/getOrders/${idCusotmer}`, createHeaders()).then(
            res => {
                if (res.data.orders) {
                    const orderClient = res.data.orders
                    const updatedOrderClient = orderClient.map((order, _) => {
                        return {
                            idBusiness: order.idBusiness,
                            orderId: order.orderId,
                            dishes: order.dishes,
                            stage: order.stage,
                            orderDate: order.orderDate,
                            isCash: order.isCash,
                            total: order.total,
                            isToTake: order.isToTake
                        }
                    })
                    dispatch(clientGetOrdersSuccess(updatedOrderClient))
                }
                
                
            }
        ).catch(e => { })
    }
   
}

export const getBusinesses = (lat, lng) => {

    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/customer/businesses/${lat}/${lng}`, createHeaders()).then(
            response => {
                const businesses = response.data.businesses

                const Updatedbusinesses = businesses.map((business, id) => {

                    const idBusiness = response.data.businesses[id].id
                    return {
                        key: idBusiness,
                        name: business[idBusiness].businessName,
                        desc: business[idBusiness].businessDesc,
                        payment: {
                            cash: business[idBusiness].payment.cash,
                            creditCard: business[idBusiness].payment.creditCard
                        },
                        delivery: {
                            isToGo: business[idBusiness].delivery.isToGo,
                            isToTake: business[idBusiness].delivery.isToTake
                        },
                        geolocation: {
                            lat: business[idBusiness].geolocation.lat,
                            lng: business[idBusiness].geolocation.lng
                        },
                        rate: [business[idBusiness].rate],
                        photoBusiness: business[idBusiness].photoBusiness,
                        distance: business[idBusiness].distance,
                        schedule: {
                            horaAbierto: business[idBusiness].schedule.horaAbierto,
                            horaCerrado: business[idBusiness].schedule.horaCerrado
                        }
                    }
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                dispatch(getBusinessesSuccess(Updatedbusinesses.sort((a, b) => a.distance - b.distance)))
            }
        ).catch(e => { })
    }
}
export const getSelectedBusiness = (idBusiness) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/customer/getBusiness/${idBusiness}`, createHeaders()).then(
            res => {
                const data = {
                    ...res.data
                }
                dispatch(clienteSelectedBusiness(data))
            }
        ).catch(e => { })
    }
}
export const getBusinessesSuccess = (businesses) => {
    return {
        type: actionTypes.CLIENTE_VER_NEGOCIOS,
        businesses: businesses
    }
}
export const clienteSelectedBusiness = (business) => {
    return {
        type: actionTypes.CLIENTE_SET_SELECTED_BUSINESS,
        business: business
    }
}

export const OpenOrderModal = () => {
    return {
        type: actionTypes.CLIENTE_MODAL_ORDEN_ABRIR
    }
}

export const CloseOrderModal = () => {
    return {
        type: actionTypes.CLIENTE_MODAL_ORDEN_CERRAR

    }
}

export const OpenSelectedProduct = (product) => {
    return {
        type: actionTypes.OPEN_ADD_DEL_OPTIONS,
        product: product
    }
}
export const CloseSelectedProduct = () => {
    return {
        type: actionTypes.CLOSE_ADD_DEL_OPTIONS,
    }
}

export const ClientClickLogo = () => {
    return {
        type: actionTypes.CLIENT_CLICK_LOGO
    }
}

export const AddOneToSelectedProduct = (product, price, img) => {
    return {
        type: actionTypes.ADD_ONE_TO_SELECTED_PRODUCT,
        product: product,
        price: price,
        img: img
    }
}

export const DelOneToSelectedProduct = (product, price, img) => {
    return {
        type: actionTypes.DEL_ONE_TO_SELECTED_PRODUCT,
        product: product,
        price: price,
        img: img
    }
}

export const setClientCoord = (coordinates) => {
    return {
        type: actionTypes.SET_ORDER_COORDINATES,
        coords: coordinates
    }
}

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    }
}

export const checkoutComplete = (message) => {
    return {
        type: actionTypes.CHECKOUT_COMPLETE,
        message: message,
        isAlert: true,
        alertType: alertTypes.success
    }
}

export const checkoutFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_FAIL,
        error: error
    }
}
export const checkoutCancel = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CANCELAR,
    }
}

export const checkout = (orderToSend) => {
    return dispatch => {
        dispatch(checkoutInit());
        axios.post(`${process.env.REACT_APP_API_URL}/customer/checkout`, orderToSend, createHeaders())
            .then(resp => {
                if (resp.data.message === 'Order received by Business') {

                    dispatch(checkoutComplete(resp.data.message))


                } else {
                    dispatch(checkoutFail('CHECKOUT FALLO'))
                }
            })
            .catch(err => {
                dispatch(checkoutFail('CHECKOUT FALLO'))
            })
    }
}

export const getClientInit = () => {
    return {
        type: actionTypes.GET_CLIENT_INIT
    }
}

export const getClientSuccess = (clientData) => {
    return {
        type: actionTypes.GET_CLIENT_SUCCESS,
        client: clientData
    }
}

export const getClientFail = () => {
    return {
        type: actionTypes.GET_CLIENT_FAIL
    }
}

export const getClient = (clientId) => {
    return dispatch => {
        if (!clientId) return;
        dispatch(getClientInit());

        axios.get(process.env.REACT_APP_API_URL + `/customer/getClient/${clientId}`, createHeaders())
            .then(resp => {
                if (!resp.data.client) dispatch(getClientFail());
                dispatch(getClientSuccess(resp.data.client))
            })
            .catch(err => {
                dispatch(getClientFail());
            })
    }

}

export const getClientNamePhone = (clientId) => {
    return dispatch => {
        if (!clientId) return;
        dispatch(getClientInit());

        axios.get(process.env.REACT_APP_API_URL + `/customer/getClientNamePhone/${clientId}`, createHeaders())
            .then(resp => {
                if (!resp.data.client) dispatch(getClientFail());
                dispatch(getClientSuccess(resp.data.client))
            })
            .catch(err => {

                dispatch(getClientFail());
            })
    }
}


export const updateClientInit = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_INIT
    }
}

export const updateBusinessInit = () => {
    return {
        type: actionTypes.INIT_GET_NEGOCIO_DETAILS,
    }
}

export const updateClientFail = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_FAIL
    }
}

export const updateClientSuccess = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_SUCCESS
    }
}

export const updatePassword = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_PASSWORD
    }
}

export const updateBusinessPassword = () => {
    return {
        type: actionTypes.UPDATE_BUSINESS_PASSWORD
    }
}


export const updateClient = (client, id) => {
    return dispatch => {
        dispatch(updateClientInit());
        axios.patch(process.env.REACT_APP_API_URL + `/customer/updateClient/${id}`, client, createHeaders())
            .then(_ => dispatch(updateClientSuccess()))
            .catch(err => {

                dispatch(updateClientFail());
            })
    }
}

export const updateClientPassword = (newCredentials, id, isCustomer) => {
    return dispatch => {
        if (isCustomer) {
            dispatch(updateClientInit());
        } else {
            dispatch(updateBusinessInit());

        }
        axios.patch(process.env.REACT_APP_API_URL + `/customer/updatePassword/${id}`, newCredentials, createHeaders())
            .then(_ => {
                if (isCustomer) {
                    dispatch(updatePassword())
                } else {
                    dispatch(updateBusinessPassword())

                }
            })
            .catch(err => {
                if (isCustomer) {
                    dispatch(updateClientFail());
                } else {
                    dispatch(updateBusinessFail())

                }
            })
    }
}

export const updateBusinessFail = () => {
    return {
        type: actionTypes.CHANGE_STAGE_FAIL
    }
}

export const setClientError = () => {
    return {
        type: actionTypes.SET_CLIENT_ERROR
    }
}

export const closeAlertClient = () => {
    return {
        type: actionTypes.CLOSE_ALERT_CLIENT
    }
}