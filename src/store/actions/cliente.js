import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const getBusinesses = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/business/businesses`).then(
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
                        rate: [business[idBusiness].rate],
                        photoBusiness: business[idBusiness].photoBusiness
                    }
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                dispatch(getBusinessesSuccess(Updatedbusinesses))
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

export const BackToPayment = () => {
    return {
        type: actionTypes.CLIENTE_REGRESAR_OPCION_PAGO
    }
}

export const CancelOrder = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CANCELAR
    }
}
export const AcceptOrder = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_ACEPTAR
    }
}
export const BackToDeliverOption = () => {
    return {
        type: actionTypes.CLIENTE_REGRESAR_OPCION_PEDIDO
    }
}
export const CashPayment = () => {
    return {
        type: actionTypes.CLIENTE_PAGO_EFECTIVO
    }
}
export const CreditCardPayment = () => {
    return {
        type: actionTypes.CLIENTE_PAGO_TARJETA
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

export const OrderIsToGo = (location) => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CASA,
        location: 'location'
    }
}

export const OrderLocation = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_CASA,
        location: 'location'
    }
}

export const OrderToPickUp = () => {
    return {
        type: actionTypes.CLIENTE_PEDIDO_RECOGER,
        location: 'location'
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
        type: actionTypes.CHECKOUT_COMPLETE
    }
}

export const checkoutFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_FAIL,
        error: error
    }
}

export const checkout = (orderToSend) => {
    return dispatch => {
        dispatch(checkoutInit());
        console.log('CHECKOUT INICIADO...')
        const order = {
            clientId: "cl2",
            negocioId: "ng1",
            name: "Shrek",
            products: {
                productId1: {
                    name: "Amborguesa",
                    amount: 2
                },
                productId2: {
                    name: "Taquitos",
                    amount: 2
                },
                productId3: {
                    name: "Algo mas",
                    amount: 2
                }
            },
            date: new Date().toLocaleString(),
            metodoPago: "Efectivo",
            metodoEntrega: "Local",
            stage: "receivedOrders"
        }

        axios.post(`${process.env.REACT_APP_API_URL}/client/checkout`, order)
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

        axios.get(process.env.REACT_APP_API_URL + `/client/getClient/${clientId}`)
            .then(resp => {
                if (!resp.data.client) dispatch(getClientFail());
                dispatch(getClientSuccess(resp.data.client))
            })
            .catch(err => {
                console.log(err);
                dispatch(getClientFail());
            })
    }

}


export const updateClientInit = () => {
    return {
        type: actionTypes.UPDATE_CLIENT_INIT
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


export const updateClient = (client, id) => {
    return dispatch => {
        dispatch(updateClientInit());
        axios.patch(process.env.REACT_APP_API_URL + `/client/updateClient/${id}`, client)
            .then(_ => dispatch(updateClientSuccess()))
            .catch(err => {
                console.log(err);
                dispatch(updateClientFail());
            })
    }
}

export const updateClientPassword = (newCredentials, id) => {
    return dispatch => {
        dispatch(updateClientInit());
        setTimeout(() => {
            dispatch(updateClientFail());
        }, 1500)
        // axios.patch(process.env.REACT_APP_API_URL + `/client/updatePassword/${id}`, newCredentials)
        //     .then(_ => dispatch(updatePassword()))
        //     .catch(err => {
        //         console.log(err);
        //         dispatch(updateClientFail());
        //     })
    }
}

export const setClientError = () => {
    return {
        type: actionTypes.SET_CLIENT_ERROR
    }
}