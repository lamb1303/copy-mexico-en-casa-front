import React, { useState } from 'react';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../UI/Button/Button';
import Backdrop from '../UI/Backdrop/Backdrop';
import SelectionModal from './SelectionModal/SelectionModal';
import TextField from '@material-ui/core/TextField';
import AlertComponent from '../UI/Alert/Alert';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

import './Home.scss';

const Home = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRequired, setEmailRequired] = useState("");
    const [passwordRequired, setPasswordRequired] = useState("");

    let credentials = null;

    const onLogin = () => {
        if (email && password) {
            setEmailRequired("");
            setPasswordRequired("");
            if (email.includes("@")) {
                credentials = {
                    email: email,
                    password: password
                }
                props.login(credentials);
            } else {
                setEmailRequired("Formato de correo incorrecto");
            }
        } else {
            setEmailRequired(email === "" ? "El correo es requerido" : "");
            setPasswordRequired(password === "" ? "La contraseña es requerida" : "");

        }

    }


    return (
        <div className='home'>
            <Backdrop show={props.join} clicked={() => { props.joinToUsClosed() }} />
            <SelectionModal show={props.join} />
            <div className='home-container'>
                <div className='home-container__logo'>
                    <Logo alt="logo mexico en casa" />
                </div>
                <div className='home-container__login'>
                    <h3>Iniciar sesi&oacute;n</h3>
                    <div>
                        <TextField
                            className="home-container__login_txt"
                            error={emailRequired ? true : false}
                            label="Ingresa tu correo"
                            id="filled-margin-normal"
                            margin="normal"
                            type="email"
                            variant="filled"
                            value={email}
                            onChange={(event) => {
                                setEmailRequired(event.target.value ? "" : emailRequired);
                                setEmail(event.target.value);
                            }}
                            helperText={emailRequired ? emailRequired : ""}

                        />
                        <TextField
                            className="home-container__login_txt"
                            error={passwordRequired ? true : false}
                            label="Ingresa tu contraseña"
                            id="filled-margin-normal"
                            margin="normal"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPasswordRequired(event.target.value ? "" : passwordRequired);
                                setPassword(event.target.value)
                            }}
                            helperText={passwordRequired ? passwordRequired : ""}
                        />
                    </div>
                    <Button btnType='Success' clicked={() => onLogin()}>Entrar</Button>
                    <Button btnType='Danger' clicked={() => props.joinToUs()}>Unirme</Button>
                </div>

            </div>
            <div>
                {props.isAlert && <AlertComponent title={props.alertType} clicked= {() => props.updateHomeAlert()}>{props.message}</AlertComponent>}
            </div>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.home.token,
        join: state.home.join,
        isAlert: state.home.isAlert,
        alertType: state.home.alertType,
        message: state.home.message,
        loading: state.home.loading,
    }
}

const mapDispatchToProps = {
    login: actions.login,
    joinToUs: actions.joinToUs,
    joinToUsClosed: actions.joinToUsClosed,
    updateHomeAlert: actions.updateHomeAlert,
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);