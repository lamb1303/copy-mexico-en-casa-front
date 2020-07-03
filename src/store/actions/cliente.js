import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const getBusinesses = (lat, lng) => {

    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/business/businesses/${lat}/${lng}`).then(
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
                            horaAbierto:  business[idBusiness].schedule.horaAbierto,
                            horaCerrado:  business[idBusiness].schedule.horaCerrado
                        }
                    }
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                dispatch(getBusinessesSuccess(Updatedbusinesses.sort((a, b) => a.distance - b.distance)))
            }
        ).catch(e => console.log(e))
    }
}
export const getSelectedBusiness = (idBusiness) => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/business/getBusiness/${idBusiness}`).then(
            res => {
                const data = {
                    ...res.data
                }
                dispatch(clienteSelectedBusiness(data))
            }
        ).catch(e => console.log(e))
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

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    }
}

export const checkoutComplete = () => {
    return {
        type: actionTypes.CHECKOUT_COMPLETE,
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
        axios.post(`${process.env.REACT_APP_API_URL}/client/checkout`, orderToSend)
            .then(resp => {
                if (resp.data.message === 'Order received by Business') {
                    dispatch(checkoutComplete())
                } else {
                    dispatch(checkoutFail('CHECKOUT FALLO'))
                }
            })
            .catch(err => {
                dispatch(checkoutFail('CHECKOUT FALLO'))
            })
    }
}