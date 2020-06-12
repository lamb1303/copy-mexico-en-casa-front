import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { loadForm } from '../utility';
import createHeaders from '../Util/headers/createHeaders';
import { logging } from './home';

export const initRegister = () => {
    return {
        type: actionTypes.INICIAR_REGISTRO
    }
}

export const registerFailed = () => {
    return {
        type: actionTypes.REGISTRO_FAIL
    }
}

export const registrarNuevoCliente = (image, cliente) => {
    return dispatch => {

        dispatch(initRegister());
        console.log('iniciando subida de img..')

        // subirFoto('clients', id, image)
        //     .then(urlFoto => {
        //         console.log('Imagen subida')
        //         console.log(urlFoto);

        //         console.log('creando usuario...')

        //         let client = {
        //             ...cliente,
        //             id: id
        //         }
        //         client.fotoINE = urlFoto

        //         axios.post(`${process.env.REACT_APP_API_URL}/registro/newClient`, client)
        //             .then(resp => {
        //                 console.log(resp)
        //                 if (resp.data.message === 'CREATION SUCCESS') {
        //                     console.log("Usuario creado")
        //                     dispatch(nuevoCliente(id))
        //                 } else {
        //                     firebase.storage.ref().child(`clients/${id}/${image.name}`).delete()
        //                         .then(() => console.log('imagen borrada'))
        //                         .catch(err => console.log(err));
        //                     dispatch(registerFailed())

        //                 }
        //             }).catch(err => {
        //                 firebase.storage.ref().child(`clients/${id}/${image.name}`).delete()
        //                     .then(() => console.log('imagen borrada'))
        //                     .catch(err => console.log(err))
        //                 dispatch(registerFailed())
        //             })

        //     })
        //     .catch(err => {
        //         console.log(err)
        //         dispatch(registerFailed())
        //     });

        console.log('Llego al final');
    }
};


export const nuevoCliente = (id) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_CLIENTE,
        id: id
    }
}

export const registrarNuevoNegocio = (data) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO,
        negocio: data.business,
        isCustomer: data.isCustomer,
        token: data.token,
        id: data.id
    }
}


export const registroNuevoNegocio = (negocio) => {
    return dispatch => {
        dispatch(initRegister());
        console.log('iniciando...')
        try {
            const formData = loadForm(negocio);
            console.log(formData);
            axios.post(`${process.env.REACT_APP_API_URL}/registro/newBusiness`, formData, createHeaders({
                'content-type': `multipart/form-data  boundary=${formData._boundary}`
            }))
                .then(resp => {
                    console.log(resp.data);

                    dispatch(registrarNuevoNegocio(resp.data))
                    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            token: resp.data.token,
                            id: resp.data.id,
                            expiration: tokenExpirationDate.toISOString()
                        })
                    );
                    dispatch(logging(resp.data))
                })
                .catch(err => {
                    console.log(err);
                    dispatch(registerFailed());
                })
        } catch (error) {
            console.log(`algo salio mal`)
            console.log(error)
            dispatch(registerFailed());
        }
    }
}

export const goToPersonal = () => {
    return {
        type: actionTypes.GO_TO_PERSONAL
    }
}

export const goToInfoNegocio = () => {
    return {
        type: actionTypes.GO_TO_INFO_NEGOCIO
    }
}

export const goToNegPago = () => {
    return {
        type: actionTypes.GO_TO_NEG_PAGO
    }
}

export const goToPrivacidad = (isOpen) => {
    return {
        type: actionTypes.GO_TO_PRIVACIDAD,
        isOpen
    }
}

export const goToWelcome = () => {
    return {
        type: actionTypes.GO_TO_WELCOME
    }
}

export const setPersonalData = (personalData) => {
    return {
        type: actionTypes.REGISTRO_SET_PERSONAL_DATA,
        data: personalData
    }

}

export const handleHorario = (value, estado, id) => {
    return {
        type: actionTypes.HANDLE_HORARIO,
        value,
        estado,
        id
    }
}

export const isOpen = (value, id) => {
    return {
        type: actionTypes.IS_OPEN,
        value,
        id
    }
}

export const setNegocioData = (nombre, direccion, descripcion) => {
    return {
        type: actionTypes.REGISTRO_SET_NEGOCIO_DATA,
        nombre,
        direccion,
        descripcion
    }
}

export const pagoTarjeta = () => {
    return {
        type: actionTypes.REGISTRO_PAGO_TARJETA
    }
}

export const pagoEfectivo = () => {
    return {
        type: actionTypes.REGISTRO_PAGO_EFECTIVO
    }
}

export const entregaNegocio = () => {
    return {
        type: actionTypes.REGISTRO_ENTREGA_NEGOCIO
    }
}

export const entregaDomicilio = () => {
    return {
        type: actionTypes.REGISTRO_ENTREGA_DOMICILIO
    }
}

export const verifyEmailExistInit = () => {
    return {
        type: actionTypes.VERIFY_EMAIL_EXIST_INIT
    }
}

export const verifyEmailExistEnd = (message) => {
    return {
        type: actionTypes.VERIFY_EMAIL_EXIST_END,
        errorMessage: message
    }
}

export const verifyEmailExist = (data) => {
    return dispatch => {
        dispatch(verifyEmailExistInit());
        axios.get(process.env.REACT_APP_API_URL + `/registro/verifyEmail/${data.email}`)
            .then(resp => {
                if (resp.data.message === 'Ok') {
                    dispatch(setPersonalData(data))
                    dispatch(goToInfoNegocio())
                    dispatch(verifyEmailExistEnd(''))
                } else {
                    dispatch(verifyEmailExistEnd(resp.data.message))
                }
            })
            .catch(err => {
                dispatch(verifyEmailExistEnd('Algo salio mal. Por favor intente mas tarde'));
            })

    }
}

export const setBCoordinates = (coordinates) => {
    return {
        type: actionTypes.SET_BUSINESS_COORDINATES,
        coords: coordinates
    }
}
export const setClientCoordinates = (coordinates) => {
    return {
        type: actionTypes.SET_CLIENT_COORDINATES,
        coords: coordinates
    }
}