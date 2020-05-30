import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';

import classes from './PersonalInfo.module.css';
import { connect } from 'react-redux';



const PersonalInfo = props => {

    const { data } = props;

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

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setNombre(data.name);
            setApellidos(data.apellidos)
            setEmail(data.email)
            setContra(data.psw)
            setConfirm(data.psw)
            setTelefono(data.telefono)
        }
    }, [data])


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

    const handleContra = (value) => {
        setContra(value);
        if (!contraTouched)
            setContraTouchedTouched(true)
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
    let lastError = false;
    if (apellidoTouched) {
        if (apellidos.length > 5) {
            lastError = false;
        } else {
            lastError = true;
        }
    }

    let passError = false;
    if (contraTouched) {
        if (contra.length >= 8) {
            passError = false;
        } else {
            passError = true;
        }
    }

    const handleSuccess = () => {
        try {
            const data = {
                name: nombre,
                apellidos,
                email,
                psw: contra,
                telefono
            };
            props.setPersonalData(data);
            props.goToInfoNegocio();
        } catch (_) {

        }
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
                className={`${classes.input} ${lastError ? classes.error : apellidoTouched ? classes.good : ''} `}
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
                className={`${classes.input} ${passError ? classes.error : contraTouched ? classes.good : ''}`}
                type="password"
                required
                value={contra}
                onChange={(e) => handleContra(e.target.value)}
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

    let formIsValid = false;
    if (nombre.length > 2
        && apellidos
        && /^\S+@\S+\.\S+$/.test(email)
        && (confirm === contra)
        && contra.length > 0
        && telefono.length >= 10) {
        formIsValid = true
    }

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
            <Button btnType='Success' disabled={!formIsValid} clicked={() => handleSuccess()} >
                CONTINUAR
            </Button>
            <Button btnType='Danger' clicked={() => props.goToWelcome()} >
                CANCELAR
            </Button>
        </div>
    </div>
};

const mapStateToProps = state => {
    return {
        data: state.registro.personalData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        goToWelcome: () => dispatch(actions.goToWelcome()),
        setPersonalData: (data) => dispatch(actions.setPersonalData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);