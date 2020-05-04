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
            uploadTask = firebase.storage.ref().child(`clients/test3@test.com/${image.name}`).put(image);
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
                            email: 'test3@test.com',
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
                                    firebase.storage.ref().child(`clients/test3@test.com/${image.name}`).delete()
                                        .then(() => console.log('imagen borrada'))
                                        .catch(err => console.log(err));
                                    dispatch(registerFailed())

                                }
                            }).catch(err => {
                                firebase.storage.ref().child(`clients/test3@test.com/${image.name}`).delete()
                                    .then(() => console.log('imagen borrada'))
                                    .catch(err => console.log(err))
                                dispatch(registerFailed())
                            })
                    })
            });
        } catch (error) {
            console.log(`algo salio mal`)
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

export const registrarNuevoNegocio = (negocio) => {
    return {
        type: actionTypes.REGISTRAR_NUEVO_NEGOCIO,
        negocio: negocio
    }
}

export const registroNuevoNegocio = (negocio) => {
    return dispatch => {
        //mandar el negocio con axios
        // si se creo 
        dispatch(registrarNuevoNegocio(negocio))
        //si no lo crea mandar mensaje de error
    }
}

export const addProductClosed = () =>{
    return {
        type: actionTypes.CLOSE_ADD_PRODUCT
    }
}

export const addProduct = (foodProduct) => {
    return dispatch => {
        //
        if (foodProduct) {
            // axios.post('`${process.env.REACT_APP_API_URL}/registro/addProduct`')
            //     .then(response => {
            //        const data = response.data;
            //         if(data.status === 201){
              //          dispatch(productAdded(data.message));
              dispatch(productAdded("Platillo creado"));
                //     }
                // }

                // )
        }

    }

}

const productAdded = (message) => {
    return {
        type: actionTypes.ADDED_FOOD_PRODUCT,
        message: message,
    }
}