import * as actionTypes from './actionTypes';
import axios from 'axios';
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
    firebase.storage.ref().child(`${from}/${id}/${image.name}`).delete()
        .then(() => console.log(`imagen ${image.name} borrada`))
        .catch(err => console.log(err))
}

export const registrarNuevoCliente = (image, cliente) => {
    return dispatch => {

        dispatch(initRegister());
        const id = uuid();
        console.log('iniciando subida de img..')

        subirFoto('clients', id, image).
            then(urlFoto => {
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



export const registroNuevoNegocio = (negocio) => {
    return dispatch => {
        dispatch(initRegister());
        const id = uuid();
        let fotoINE = '';
        console.log('iniciando...')
        let fotoNegocio = '';
        let uploadTask;
        try {
            console.log('subiendo primer foto...')
            subirFoto('business', id, negocio.fotoINE)
                .then(urlINE => {
                    console.log('primer foto subida')
                    console.log(urlINE)
                    console.log('subiendo segunda foto...')
                    subirFoto('business', id, negocio.img)
                        .then(urlNegocio => {
                            console.log('segunda foto subida')
                            console.log(urlNegocio)
                            console.log(`Creando usuario...`)
                            let business = {
                                ...negocio
                            }
                            business.fotoINE = urlINE
                            business.img = urlNegocio
                            axios.post(`${process.env.REACT_APP_API_URL} `, business)
                                .then(resp => {
                                    if (resp.data.message === 'CREATION SUCCESS') {
                                        console.log("business creado")
                                        dispatch(registrarNuevoNegocio(negocio))
                                    } else {
                                        deleteFoto('business', id, negocio.fotoINE);
                                        deleteFoto('business', id, negocio.fotoNegocio);
                                        dispatch(registerFailed())
                                    }
                                }).catch(err => {
                                    deleteFoto('business', id, negocio.fotoINE);
                                    deleteFoto('business', id, negocio.fotoNegocio);
                                    dispatch(registerFailed())
                                })
                        })
                        .catch(err => {
                            deleteFoto('business', id, negocio.fotoINE);
                            deleteFoto('business', id, negocio.fotoNegocio);
                            dispatch(registerFailed())
                            console.log(err);
                        })
                }).catch(err => {
                    deleteFoto('business', id, negocio.fotoINE);
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