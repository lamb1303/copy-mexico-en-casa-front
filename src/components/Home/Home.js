import React, { useState } from 'react';

import Button from '../UI/Button/Button';
import Backdrop from '../UI/Backdrop/Backdrop';
import TextField from '@material-ui/core/TextField';
import AlertComponent from '../UI/Alert/Alert';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

import './Home.scss';

import ImageUpload from './ImageUpload';
const Home = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let credentials = null;

    const onLogin = () => {
        console.log("ñsdkfñlsdkflñds");
        if (username && password) {
            console.log("entro");
            credentials = {
                username: username,
                password: password
            }

            props.login(credentials);
        }

    }

    const validate = (pickedFile, fileIsValid) => {
        if (fileIsValid) {
            props.nuevoClient(pickedFile);
        }
    }

    return (
        <div className='home'>
            <Backdrop show={props.join} clicked={() => { props.joinToUsClosed() }} />
            {props.loading ? <p>LOADING...</p> : props.id}
            <div className='home-container'>
                <div className='home-container__logo'>
                    <img src="./logo.png" alt="logo mexico en casa" />
                </div>
                <div className='home-container__login'>
                    <h3>Iniciar sesi&oacute;n</h3>
                    <TextField
                        label="Ingresa tu usuario"
                        id="filled-margin-normal"
                        margin="normal"
                        variant="filled"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        label="Ingresa tu contraseña"
                        id="filled-margin-normal"
                        margin="normal"
                        variant="filled"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {/* <ImageUpload id='image' onInput={(_, pickedFile, fileIsValid) => validate(pickedFile, fileIsValid)} errorText='Please provide an image' /> */}
                    <Button btnType='Success' clicked={() => onLogin()}>Entrar</Button>
                    <Button btnType='Danger' clicked={() => props.joinToUs()}>Unirme</Button>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.home.token,
        join: state.home.join,
        loading: state.registro.loading,
        id: state.registro.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (credentials) => dispatch(actions.login(credentials)),
        joinToUs: () => dispatch(actions.joinToUs()),
        joinToUsClosed: () => dispatch(actions.joinToUsClosed()),
        nuevoClient: (image) => dispatch(actions.registrarNuevoCliente(image))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);