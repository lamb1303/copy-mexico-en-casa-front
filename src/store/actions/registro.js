import * as actionTypes from './actionTypes';
import axios from '../../axios';
import firebase from '../../firebase/config';
const { v4: uuid } = require('uuid');

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

const subirFoto = (child, id, imagen) => {
    return new Promise((resolved, error) => {
        let uploadTask;
        uploadTask = firebase.storage.ref().child(`${child}/${id}/${imagen.name}`).put(imagen);

        uploadTask.on('state_changed', () => {

        }, err => {
            error(err)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(url => {
                    resolved(url);
                })
                .catch((err) => {
                    error(err)
                })
        })
    })
}

const deleteFoto = (from, id, image) => {
    firebase.storage.ref().child(`${from}/${id}/${image}`).delete()
        .then(() => console.log(`imagen ${image} borrada`))
        .catch(err => console.log(err))
}

export const registrarNuevoCliente = (image, cliente) => {
    return dispatch => {

        dispatch(initRegister());
        const id = uuid();
        console.log('iniciando subida de img..')

        subirFoto('clients', id, image)
            .then(urlFoto => {
                console.log('Imagen subida')
                console.log(urlFoto);

                console.log('creando usuario...')

                let client = {
                    ...cliente,
                    id: id
                }
                client.fotoINE = urlFoto

                axios.post(`${process.env.REACT_APP_API_URL}/registro/newClient`, client)
                    .then(resp => {
                        console.log(resp)
                        if (resp.data.message === 'CREATION SUCCESS') {
                            console.log("Usuario creado")
                            dispatch(nuevoCliente(id))
                        } else {
                            firebase.storage.ref().child(`clients/${id}/${image.name}`).delete()
                                .then(() => console.log('imagen borrada'))
                                .catch(err => console.log(err));
                            dispatch(registerFailed())

                        }
                    }).catch(err => {
                        firebase.storage.ref().child(`clients/${id}/${image.name}`).delete()
                            .then(() => console.log('imagen borrada'))
                            .catch(err => console.log(err))
                        dispatch(registerFailed())
                    })

            })
            .catch(err => {
                console.log(err)
                dispatch(registerFailed())
            });

        console.log('Llego al final');
    }
};


export const nuevoCliente = (id) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_CLIENTE,
        id: id
    }
}

export const registrarNuevoNegocio = (negocio) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO,
        negocio: negocio
    }
}

const crearNegocio = (negocio, negPhoto, id) => {
    return new Promise((resolved, error) => {
        console.log(`Creando usuario...`)
        let business = {
            ...negocio
        }
        delete business['photoINEName'];
        delete business['photoBusinessName'];
        
        axios.post(`${process.env.REACT_APP_API_URL}/registro/newBusiness`, business)
            .then(resp => {
                if (resp.data.message === 'CREATION SUCCESS') {
                    console.log("business creado")
                    resolved(negocio)

                } else {
                    deleteFoto('business', id, negocio.photoINEName);
                    console.log('Foto INE borrada 1');
                    if (negPhoto === 'negocioURL') {
                        deleteFoto('business', id, negocio.photoBusinessName);
                        console.log('foto negocio borrada 1');
                    }
                    error()
                }
            }).catch(err => {
                deleteFoto('business', id, negocio.photoINEName);
                console.log('Foto INE borrada 2');
                if (negPhoto === 'negocioURL') {
                    deleteFoto('business', id, negocio.photoBusinessName);
                    console.log('foto negocio borrada 2');
                }
                error()
            })
    })
}

export const registroNuevoNegocio = (negocio) => {
    return dispatch => {
        dispatch(initRegister());
        const id = uuid();
        console.log('iniciando...')
        try {

            negocio["photoINEName"] = negocio.photoINE.name;
            if (negocio.photoBusiness !== undefined) {
                negocio["photoBusinessName"] = negocio.photoBusiness.name;
            }else{
                negocio["photoBusinessName"] = '';
            }

            console.log('subiendo primer foto...')
            subirFoto('business', id, negocio.photoINE)
                .then(urlINE => {
                    console.log('primer foto subida')
                    console.log(urlINE)
                    negocio.photoINE = urlINE;

                    if (negocio.photoBusiness === undefined) {
                        negocio.photoBusiness = 'https://thumbs.dreamstime.com/b/empty-white-room-inner-space-box-vector-design-illustration-mock-up-you-business-project-138003758.jpg';
                        crearNegocio(negocio, '', id)
                            .then(resolved => dispatch(registrarNuevoNegocio(negocio)))
                            .catch(err => dispatch(registerFailed()))
                    } else {
                        console.log('subiendo segunda foto...')
                        subirFoto('business', id, negocio.photoBusiness)
                            .then(urlNegocio => {
                                console.log('segunda foto subida')
                                console.log(urlNegocio);
                                negocio.photoBusiness = urlNegocio;
                                crearNegocio(negocio, 'negocioURL', id)
                                    .then(resolved => dispatch(registrarNuevoNegocio(negocio)))
                                    .catch(err => dispatch(registerFailed()))
                            })
                            .catch(err => {
                                deleteFoto('business', id, negocio.photoINEName);
                                // deleteFoto('business', id, negocio.photoBusinessName);
                                dispatch(registerFailed())
                                console.log(err);
                            })
                    }
                }).catch(err => {
                    deleteFoto('business', id, negocio.photoINEName);
                    dispatch(registerFailed())
                    console.log(err)
                });

        } catch (error) {
            console.log(`algo salio mal`)
            console.log(error)
            dispatch(registerFailed());
            return;
        }


        //si no lo crea mandar mensaje de error
    }
}

export const addProduct = (foodProduct) => {
    return dispatch => {
        if (foodProduct) {
            axios.post(`${process.env.REACT_APP_API_URL}/business/addProduct`, foodProduct)
                .then(response => {
                    const data = response.data;
                    if (data.status === 201) {
                        dispatch(productAdded(data.message));
                    }
                }

                )
        }

    }

}

const productAdded = (message) => {
    return {
        type: actionTypes.ADDED_FOOD_PRODUCT,
        message: message,
        isAlert: true,
        alertType: 'Success'
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
