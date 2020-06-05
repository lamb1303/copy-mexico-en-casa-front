import React, { useState, useEffect, Fragment } from 'react';
import Card from '../../UI/Card/Card';
import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';
// import Map from '../../UI/Map/Map';
import ShowMap from './showMap/showMap';
import Alert from '../../UI/Alert/Alert';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { ReactComponent as MapLogo } from '../../../assets/map.svg';

import classes from './NegocioInfo.module.css';

const NegocioInfo = props => {

    const { negocioData } = props;

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nombreTouched, setNombreTouched] = useState(false);
    const [direccionTouched, setDireccionTouched] = useState(false);
    const [descripcionTouched, setDescripcionTouched] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showHorarioAlert, setShowHorarioAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(negocioData).length > 0) {
            setNombre(negocioData.nombre);
            setDireccion(negocioData.direccion);
            setDescripcion(negocioData.descripcion);
        }
    }, [negocioData]);


    const handleNombre = (value) => {
        setNombre(value);
        if (!nombreTouched) {
            setNombreTouched(true);
        }
    }

    const handleDireccion = (value) => {
        setDireccion(value);
        if (!direccionTouched) {
            setDireccionTouched(true);
        }
    }

    const handleDescripcion = value => {
        setDescripcion(value);
        if (!descripcionTouched) {
            setDescripcionTouched(true)
        }
    }

    let nombreError = false;
    if (nombreTouched) {
        if (nombre.length < 2) {
            nombreError = true;
        } else {
            nombreError = false
        }
    }

    let dirError = false;
    if (direccionTouched) {
        if (direccion.length < 10) {
            dirError = true;
        } else {
            dirError = false;
        }
    }

    let descError = false;
    if (descripcionTouched) {
        if (descripcion.length < 5) {
            descError = true;
        } else {
            descError = false;
        }
    }

    const handleContinue = () => {
        const atLeastOneOpen = props.days.find(day => day.abierto === true);
        if (atLeastOneOpen) {
            props.goToNegPago()
            props.setNegocioData(nombre, direccion, descripcion);
        } else {
            console.log('selecciona al menos un dia prro')
        }
    }


    const getLocation = () => {
        if ('geolocation' in navigator) {
            if (coordinates) {
                setShowBackdrop(true);
            } else {
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
        } else {
            setCoordinates({});
            setShowBackdrop(true);
        }
    }

    const horarioError = (message) => {
        setAlertMessage(message);
        setShowHorarioAlert(true);
    }

    let isFormValid = false;
    if (nombre.length > 2 &&
        direccion.length >= 10 &&
        descripcion.length > 5 &&
        props.days.find(day => day.abierto === true)) {
        isFormValid = true;
    }

    if (showHorarioAlert) {
        setTimeout(() => {
            setShowHorarioAlert(false);
        }, 5000)
    }

    const getCoordinatesFromMap = (currentPosition) => {
        setCoordinates(currentPosition);
        props.onSetCoordinates(currentPosition);
        setShowBackdrop(false);
    }

    return (
        <Fragment>
            {<Backdrop show={showBackdrop} clicked={() => setShowBackdrop(false)} />}
            {showBackdrop && <ShowMap nombre={nombre} coordinates={coordinates} getCoords={(currentPosition) => getCoordinatesFromMap(currentPosition)} />}
            {showAlert && <Alert title='Error' clase={'personalInfo'} clicked={() => setShowAlert(false)} >No se puede abrir el mapa por el momento. Intentelo mas tarde</Alert>}
            {showHorarioAlert && <Alert title='Warning' clase={'personalInfo'} >{alertMessage} </Alert>}
            <div className={classes.NegocioInfo}>
                <div className={classes.header} >
                    <span>Datos del Negocio. Por favor llene los datos del negocio</span>
                </div>
                <div className={classes.card} >
                    <Card>
                        <div className={classes.form} >
                            <input
                                className={`${classes.input} ${nombreError ? classes.error : nombreTouched ? classes.good : ''}`}
                                type="text"
                                value={nombre}
                                onChange={(event) => handleNombre(event.target.value)}
                                placeholder='Nombre del negocio'
                            />
                            <div className={classes.location} >
                                <input
                                    className={`${classes.input} ${dirError ? classes.error : direccionTouched ? classes.good : ''}`}
                                    type="text"
                                    value={direccion}
                                    onChange={(event) => handleDireccion(event.target.value)}
                                    placeholder='Direccion del negocio'
                                />
                                <MapLogo onClick={() => getLocation()} />
                            </div>
                            <textarea
                                className={`${classes.textarea} ${descError ? classes.error : descripcionTouched ? classes.good : ''}`}
                                type="text"
                                rows='10'
                                value={descripcion}
                                onChange={(event) => handleDescripcion(event.target.value)}
                                placeholder='Descripcion del negocio'
                            />
                            <Table horarioError={(message) => horarioError(message)} />
                        </div>
                    </Card>
                </div>
                <div className={classes.buttons} >
                    <Button btnType='Success' disabled={!isFormValid} clicked={() => handleContinue()} >
                        CONTINUAR
            </Button>
                    <Button btnType='Danger' clicked={() => props.goToPersonal()} >
                        CANCELAR
            </Button>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        days: state.registro.days,
        negocioData: state.registro.negocioData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToPersonal: () => dispatch(actions.goToPersonal()),
        goToNegPago: () => dispatch(actions.goToNegPago()),
        setNegocioData: (nombre, direccion, descripcion) => dispatch(actions.setNegocioData(nombre, direccion, descripcion)),
        onSetCoordinates: (coords) => dispatch(actions.setBCoordinates(coords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NegocioInfo);