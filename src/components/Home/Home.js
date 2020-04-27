import React, { useState } from 'react';

import Button from '../UI/Button/Button';
import Backdrop from '../UI/Backdrop/Backdrop';
import SelectionModal from './SelectionModal/SelectionModal';
import TextField from '@material-ui/core/TextField';
import AlertComponent from '../UI/Alert/Alert';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

import './Home.scss';


const Home = props => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRequired, setemailRequired] = useState("");
    const [passwordRequired, setPasswordRequired] = useState("");

    let credentials = null;

    const onLogin = () => {
        if (email && password) {
            setemailRequired("");
            setPasswordRequired("");
            if (email.includes("@")) {
                credentials = {
                    email: email,
                    password: password
                }
                props.login(credentials);
            } else {
                setemailRequired("Formato de correo incorrecto");
            }
        } else {
            setemailRequired(email === "" ? "El correo es requerido" : "");
            setPasswordRequired(password === "" ? "La contraseña es requerida" : "");

        }

    }



    return (
        <div className='home'>
            <Backdrop show={props.join} clicked={() => { props.joinToUsClosed() }} />
            <SelectionModal show={props.join} />
            <div className='home-container'>
                <div className='home-container__logo'>
                    <img src="./logo.png" alt="logo mexico en casa" />
                </div>
                <div className='home-container__login'>
                    <h3>Iniciar sesi&oacute;n</h3>
                    <div>
                        <TextField
                            error={emailRequired ? true : false}
                            label="Ingresa tu correo"
                            id="filled-margin-normal"
                            margin="normal"
                            type="email"
                            variant="filled"
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                            helperText={emailRequired ? emailRequired : ""}

                        />
                        <TextField
                            error={passwordRequired ? true : false}
                            label="Ingresa tu contraseña"
                            id="filled-margin-normal"
                            margin="normal"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            helperText={passwordRequired ? passwordRequired : ""}
                        />
                    </div>
                    <Button btnType='Success' clicked={() => onLogin()}>Entrar</Button>
                    <Button btnType='Danger' clicked={() => props.joinToUs()}>Unirme</Button>
                </div>

            </div>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.home.token,
        join: state.home.join
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (credentials) => dispatch(actions.login(credentials)),
        joinToUs: () => dispatch(actions.joinToUs()),
        joinToUsClosed: () => dispatch(actions.joinToUsClosed()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);