import React, { useState, Fragment } from 'react';

import Button from '../../UI/Button/Button'
import Card from '../../UI/Card/Card';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ShowMap from '../../UI/ShowMap/ShowMap';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import classes from './RegistroCliente.module.css'
import { ReactComponent as MapLogo } from '../../../assets/map.svg';
import Alert from '../../UI/Alert/Alert';
import axios from 'axios';
import AvisoPrivacidad from './AvisoPrivacidad';
import { Redirect } from 'react-router-dom';


const baseObject = {
    isValid: false,
    touched: false,
    value: ''
}

const RegistroCliente = props => {

    const [name, setName] = useState(baseObject);
    const [lastName, setLastName] = useState(baseObject);
    const [email, setEmail] = useState(baseObject);
    const [password, setPassword] = useState(baseObject);
    const [phone, setPhone] = useState(baseObject);
    const [direction, setDirection] = useState(baseObject);

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const [cancelReg, setCancelReg] = useState(false);
    const [avisoPrivacidad, setAvisoPrivacidad] = useState({ show: false, accepted: false })

    const register = () => {
        const client = {
            name: name.value,
            apellidos: lastName.value,
            email: email.value,
            password: password.value,
            telefono: phone.value,
            direccion: direction.value,
        }

        // if Previously selected from map
        if (props.geolocation) {
            client['geolocation'] = props.geolocation
            props.onClientExist(client);
        } else {
            // Search by entered Street
            const street = direction.value.trim().replace(/ /g, '+');
            axios.get(`https://nominatim.openstreetmap.org/search?q=${street}&format=json&polygon_geojson=1&addressdetails=1`)
                .then(resp => {
                    if (Object.keys(resp.data).length > 0) {
                        client['geolocation'] = { lat: resp.data[0].lat, lng: resp.data[0].lon }
                        props.onClientExist(client);
                    } else {
                        /**
                         * Search by entered Street bring no results.
                         * Then get position from browser
                         */
                        const options = {
                            enableHighAccuracy: true,
                            timeout: 5000,
                        }
                        navigator.geolocation.getCurrentPosition((coords) => {
                            client['geolocation'] = { lat: coords.coords.latitude, lng: coords.coords.longitude }
                            props.onClientExist(client);
                        }, (err) => {
                        }, options);
                    }
                })
                .catch(err => {});
        }
    }

    const rules = (value, type) => {
        switch (type) {
            case 'text': return value.length > 5;
            case 'password': return value.length >= 8;
            case 'email': return /^\S+@\S+\.\S+$/.test(value);
            case 'number': return value.length >= 10;
            default: return false;
        }
    }

    const handleInput = (id, value) => {

        if (props.errorMessage) props.setErrorMessage()

        switch (id) {
            case 'name':
                if (!name.touched) setName({ value: value, touched: true, isValid: rules(value, 'text') })
                else setName({ ...name, value: value, isValid: rules(value, 'text') })
                break;
            case 'lastName':
                if (!lastName.touched) setLastName({ value: value, touched: true, isValid: rules(value, 'text') })
                else setLastName({ ...lastName, value: value, isValid: rules(value, 'text') })
                break;
            case 'email':
                if (!email.touched) setEmail({ value: value, touched: true, isValid: rules(value, 'email') })
                else setEmail({ ...email, value: value, isValid: rules(value, 'email') })
                break;
            case 'password':
                if (!password.touched) setPassword({ value: value, touched: true, isValid: rules(value, 'text') })
                else setPassword({ ...password, value: value, isValid: rules(value, 'text') })
                break;
            case 'phone':
                if (value.length >= 11) return;
                if (!phone.touched) setPhone({ value: value, touched: true, isValid: rules(value, 'number') })
                else setPhone({ ...phone, value: value, isValid: rules(value, 'number') })
                break;
            case 'direction':
                if (!direction.touched) setDirection({ value: value, touched: true, isValid: rules(value, 'text') })
                else setDirection({ ...direction, value: value, isValid: rules(value, 'text') })
                break;
            default: console.log('default');
        }
    }

    const getLocationByBrowser = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
        }
        navigator.geolocation.getCurrentPosition((coords) => {
            setCoordinates({ lat: coords.coords.latitude, lng: coords.coords.longitude });
        }, (err) => {
            setShowAlert(true)
        }, options);
    }

    const getLocation = () => {
        if (props.geolocation) { setShowBackdrop(true); return }
        if (direction.value.length > 5) {
            const street = direction.value.trim().replace(/ /g, '+');
            street.replace('#', '');
            axios.get(`https://nominatim.openstreetmap.org/search?q=${street}&format=json&polygon_geojson=1&addressdetails=1`)
                .then(resp => { //Tulipanes 342 Saltillo
                    if (Object.keys(resp.data).length > 0) {
                        setCoordinates({
                            lat: resp.data[0].lat,
                            lng: resp.data[0].lon
                        })
                    } else getLocationByBrowser();
                    setShowBackdrop(true)
                })
                .catch(err => {});
        } else {
            getLocationByBrowser();
            setShowBackdrop(true)
        }
    }

    const getCoordinatesFromMap = (currentPosition, address) => {
        if (address.includes('undefined')) return;
        setCoordinates(currentPosition);
        props.onSetCoordinates(currentPosition);
        setDirection({ ...direction, value: address, isValid: rules(address, 'text') })
        setShowBackdrop(false);
    }

    const form = (
        <>
            <input
                type='text'
                placeholder='Nombre'
                value={name.value}
                className={`${classes.input} ${name.isValid ? classes.good : name.touched ? classes.bad : ''}`}
                onChange={(event) => handleInput('name', event.target.value)}
            />
            <input
                type='text'
                placeholder='Apellidos'
                value={lastName.value}
                className={`${classes.input} ${lastName.isValid ? classes.good : lastName.touched ? classes.bad : ''}`}
                onChange={(event) => handleInput('lastName', event.target.value)}
            />
            <input
                type='email'
                placeholder='Email'
                value={email.value}
                className={`${classes.input} ${email.isValid ? classes.good : email.touched ? classes.bad : ''}`}
                onChange={(event) => handleInput('email', event.target.value)}
            />
            <input
                type='password'
                placeholder='Contraseña'
                value={password.value}
                className={`${classes.input} ${password.isValid ? classes.good : password.touched ? classes.bad : ''}`}
                onChange={(event) => handleInput('password', event.target.value)}
            />
            <input
                type='number'
                placeholder='Telefono'
                value={phone.value}
                className={`${classes.input} ${phone.isValid ? classes.good : phone.touched ? classes.bad : ''}`}
                onChange={(event) => handleInput('phone', event.target.value)}
            />
            <div className={classes.location}>
                <input
                    type='text'
                    placeholder='Calle, Ciudad, CP'
                    value={direction.value}
                    className={`${classes.input} ${direction.isValid ? classes.good : direction.touched ? classes.bad : ''}`}
                    onChange={(event) => handleInput('direction', event.target.value)}
                />
                <MapLogo onClick={() => getLocation()} />
            </div>
        </>
    )

    let formValid = false;
    if (name.isValid &&
        lastName.isValid &&
        email.isValid &&
        password.isValid &&
        phone.isValid &&
        direction.isValid &&
        avisoPrivacidad.accepted
    ) formValid = true;


    return (
        <Fragment>
            {props.loading && <> <Backdrop show={props.loading} /> <Spinner /> </>}
            {cancelReg && <Redirect to='/Home' />}
            {avisoPrivacidad.show && (
                <Backdrop
                    clicked={() => setAvisoPrivacidad({ ...avisoPrivacidad, show: false })}
                    show={avisoPrivacidad.show}
                />)}
            {avisoPrivacidad.show && <AvisoPrivacidad />}
            {props.errorMessage && <Alert title='Error' clase={'personalInfo'} >{props.errorMessage}</Alert>}
            <div className={classes.background}></div>
            {<Backdrop show={showBackdrop} />}
            {showBackdrop && (
                <ShowMap
                    nombre={name.value}
                    coordinates={coordinates}
                    getCoords={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
                    address={direction.value}
                />
            )}
            {showAlert && (<Alert
                title='Error'
                clase={'personalInfo'}
                clicked={() => setShowAlert(false)}
            >No se puede abrir el mapa por el momento. Intentelo mas tarde
            </Alert>)}}
            <div className={classes.personalInfo} >
                <div className={classes.header} >
                    <span>Listo para disfrutar las delicias de México. Por favor, llena los siguientes datos.</span>
                </div>
                <div className={classes.card} >
                    <Card >
                        <div className={classes.form} >
                            {form}
                        </div>
                    </Card>
                </div>
                <div className={classes.aviso} >
                    <input type='checkbox' onChange={event => setAvisoPrivacidad({ ...avisoPrivacidad, accepted: event.target.checked })} />
                    <span className={classes.avisoLink} >Acepto </span>
                    <span onClick={() => setAvisoPrivacidad({ ...avisoPrivacidad, show: true })} className={classes.privacidad} >aviso de privacidad</span>
                </div>
                <div className={classes.buttons} >
                    <Button
                        btnType='Success'
                        clicked={() => register()}
                        disabled={!formValid}
                    >REGISTRAME!</Button>
                    <Button
                        btnType='Danger'
                        clicked={() => setCancelReg(true)}
                    >SALIR</Button>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        geolocation: state.registro.geolocation,
        loading: state.registro.loading,
        errorMessage: state.registro.errorMessage,
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        nuevoCliente: () => dispatch(actions.registrarNuevoCliente()),
        onSetCoordinates: (coords) => dispatch(actions.setBCoordinates(coords)),
        onClientExist: (client) => dispatch(actions.registrarNuevoCliente(client)),
        setErrorMessage: () => dispatch(actions.setErrorMessage())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(RegistroCliente);
