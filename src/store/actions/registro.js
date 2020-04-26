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

export const registrarNuevoCliente = (image) => {
    return dispatch => {

        dispatch(initRegister());
        const id = uuid();
        let imageUrl = '';
        console.log('iniciando...')
        let uploadTask;
        try {
            uploadTask = firebase.storage.ref().child(`clients/${id}/${image.name}`).put(image);
            uploadTask.on('state_changed', () => {

            }, err => {
                dispatch(registerFailed());
                return;
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(url => {
                        imageUrl = url
                        console.log(`Creando usuario...`)
                        const client = {
                            id: id,
                            name: 'Pancho',
                            apellidos: 'Gonzalez Salgado',
                            email: 'test@test.com',
                            password: 'laPassword',
                            telefono: 8442736598,
                            direccion: 'calle valencia #345 col. Zaragoza',
                            fotoINE: imageUrl
                        }
                        axios.post(`${process.env.REACT_APP_API_URL}/registro/newClient`, client)
                            .then(resp => {
                                if (resp.data.message === 'CREATION SUCCESS') {
                                    console.log("Usuario creado")
                                    dispatch(nuevoCliente(id))
                                } else {
                                    console.log('fallo crear el user')
                                    dispatch(registerFailed());
                                }
                            }).catch(_ => dispatch(registerFailed()))
                    })
            });
        } catch (error) {
            console.log(`falla al subir la img`)
            console.log(error)
            dispatch(registerFailed());
            return;
        }
    }
};

export const nuevoCliente = (id) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_CLIENTE,
        id: id
    }
}

export const registrarNuevoNegocio = () => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO
    }
}