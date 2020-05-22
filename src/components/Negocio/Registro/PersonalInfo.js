import React, { useState } from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';

import classes from './PersonalInfo.module.css';
import { connect } from 'react-redux';



const PersonalInfo = props => {

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [contra, setContra] = useState("");
    const [confirm, setConfirm] = useState("");
    const [telefono, setTelefono] = useState("");
    const [touched, setTouched] = useState(false);
    const [phoneTouched, setphoneTouched] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);
    const [apellidoTouched, setApellidoTouched] = useState(false);
    const [contraTouched, setContraTouchedTouched] = useState(false);

    const handlePhone = (value) => {
        if (value.length >= 11) {
            return;
        } else {
            setTelefono(value);
            setphoneTouched(true);
        }
    }

    const handleName = (value) => {
        setNameTouched(true);
        setNombre(value);
    }
    const handleEmail = (value) => {
        setTouched(true);
        setEmail(value);
    }
    const handleConfirm = (value) => {
        setConfirmTouched(true);
        setConfirm(value);
    }

    let emailError = false;
    if (touched) {
        emailError = /^\S+@\S+\.\S+$/.test(email);
    }

    let phoneError = false;
    if (phoneTouched) {
        if (telefono.length >= 10) {
            phoneError = false;
        } else {
            phoneError = true;
        }
    }

    let confirmError = false;
    if (confirmTouched) {
        if (confirm === contra) {
            confirmError = false;
        } else {
            confirmError = true;
        }
    }

    let nameError = false;
    if (nameTouched) {
        if (nombre.length > 2) {
            nameError = false;
        } else {
            nameError = true;
        }
    }
    let last = '';
    if (apellidoTouched) {
        last = 'good';
    }

    let pass = '';
    if (contraTouched) {
        pass = 'good';
    }

    const form = (
        <>
            <input
                className={`${classes.input} ${nameError ? classes.error : nameTouched ? classes.good : ''} `}
                type="text"
                required
                value={nombre}
                onChange={(e) => handleName(e.target.value)}
                placeholder='Nombre'
            />
            <input
                className={`${classes.input} ${classes[last]} `}
                type="text"
                required
                value={apellidos}
                onChange={(e) => { setApellidos(e.target.value); setApellidoTouched(true) }}
                placeholder='Apellidos'
            />
            <input
                className={`${classes.input} ${emailError ? classes.good : touched ? classes.error : ''} `}
                type="email"
                required
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                className={`${classes.input} ${classes[pass]}`}
                type="password"
                required
                value={contra}
                onChange={(e) => { setContra(e.target.value); setContraTouchedTouched(true) }}
                placeholder='Contraseña'
            />
            <input
                className={`${classes.input} ${confirmError ? classes.error : confirmTouched ? classes.good : ''} `}
                type="password"
                required
                value={confirm}
                onChange={(e) => handleConfirm(e.target.value)}
                placeholder='Confirmar Contraseña'
            />
            <input
                className={`${classes.input} ${phoneError ? classes.error : phoneTouched ? classes.good : ''}`}
                type="number"
                required
                value={telefono}
                onChange={(e) => handlePhone(e.target.value)}
                placeholder='Telefono'
            />
        </>
    )



    return <div className={classes.personalInfo} >
        <div className={classes.header} >
            <span>Datos Personales. Por favor llene los datos de la persona responsable del negocio.</span>
        </div>
        <div className={classes.card} >
            <Card >
                <div className={classes.data} >
                    {form}
                </div>
            </Card>
        </div>
        <div className={classes.buttons} >
            <Button btnType='Success' clicked={() => props.goToInfoNegocio()} >
                CONTINUAR
            </Button>
            <Button btnType='Danger' clicked={() => props.goToWelcome()} >
                CANCELAR
            </Button>
        </div>
    </div>
};

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        goToWelcome: () => dispatch(actions.goToWelcome())
    }
}

export default connect(null, mapDispatchToProps)(PersonalInfo);