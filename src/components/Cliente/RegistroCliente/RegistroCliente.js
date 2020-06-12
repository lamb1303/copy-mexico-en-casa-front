import React, { useState } from 'react';

import Button from '../../UI/Button/Button'
// import ImageUpload from '../../UI/ImageUpload/ImageUpload';
import Card from '../../UI/Card/Card';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ShowMap from '../../UI/ShowMap/ShowMap';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import classes from './RegistroCliente.module.css'
import { ReactComponent as MapLogo } from '../../../assets/map.svg';
import Alert from '../../UI/Alert/Alert';
import axios from 'axios';


const baseObject = {
    isValid: false,
    touched: false,
    value: ''
}

const RegistroCliente = props => {

    const [name, setName] = useState({ isValid: false, touched: false, value: '' });
    const [lastName, setLastName] = useState({ isValid: false, touched: false, value: '' });
    const [email, setEmail] = useState({ isValid: false, touched: false, value: '' });
    const [password, setPassword] = useState({ isValid: false, touched: false, value: '' });
    const [phone, setPhone] = useState({ isValid: false, touched: false, value: '' });
    const [direction, setDirection] = useState({ isValid: false, touched: false, value: '' });

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const printAll = () => {
        console.log(name)
        console.log(lastName)
        console.log(email)
        console.log(password)
        console.log(phone)
        console.log(direction)
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
            setShowBackdrop(true);
        }, (err) => {
            setShowAlert(true)
        }, options);
    }

    const getLocation = () => {
        if (props.geolocation) { setShowBackdrop(true); return }
        if (direction.length > 5) {
            const street = direction.trim().replace(/ /g, '+');
            console.log(street);
            axios.get(`https://nominatim.openstreetmap.org/search?q=${street}&format=json&polygon_geojson=1&addressdetails=1`)
                .then(resp => {
                    console.log(resp.data.length)
                    if (Object.keys(resp.data).length > 0) {
                        setCoordinates({
                            lat: resp.data[0].lat,
                            lng: resp.data[0].lon
                        })
                        setShowBackdrop(true)
                    } else {
                        getLocationByBrowser();
                    }
                })
                .catch(err => console.log(err));
        } else {
            getLocationByBrowser();
        }
    }

    const getCoordinatesFromMap = (currentPosition, address) => {
        setCoordinates(currentPosition);
        props.onSetCoordinates(currentPosition);
        setDirection(address);
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
                    placeholder='Direccion'
                    value={direction.value}
                    className={`${classes.input} ${direction.isValid ? classes.good : direction.touched ? classes.bad : ''}`}
                    onChange={(event) => handleInput('direction', event.target.value)}
                />
                <MapLogo onClick={() => getLocation()} />
            </div>
        </>
    )

    return (
        <>
            <div className={classes.background}></div>

            <div className={classes.personalInfo} >
                {<Backdrop show={showBackdrop} />}
                {showBackdrop && (
                    <ShowMap
                        nombre={name}
                        coordinates={coordinates}
                        getCoords={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
                        address={direction}
                    />
                )}
                {showAlert && (<Alert
                    title='Error'
                    clase={'personalInfo'}
                    clicked={() => setShowAlert(false)}
                >No se puede abrir el mapa por el momento. Intentelo mas tarde
                </Alert>)}}
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
                <div> <Button clicked={() => printAll()} >Click</Button> </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        geolocation: state.registro.geolocation
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        nuevoCliente: () => dispatch(actions.registrarNuevoCliente()),
        onSetCoordinates: (coords) => dispatch(actions.setBCoordinates(coords))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(RegistroCliente);
