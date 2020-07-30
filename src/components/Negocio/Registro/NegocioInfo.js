import React, { useState, useEffect, Fragment } from 'react';
import Card from '../../UI/Card/Card';
import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Input from '../../UI/Input/Input';
import ShowMap from '../../UI/ShowMap/ShowMap';
import Alert from '../../UI/Alert/Alert';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { ReactComponent as MapLogo } from '../../../assets/map.svg';

import classes from './NegocioInfo.module.css';

const NegocioInfo = props => {

    const { negocioData, geolocation } = props;
    const [form, setForm] = useState({
        name: {
            element: 'input',
            id: 'name',
            isValid: false,
            touched: false,
            value: "",
            type: 'text',
            placeholder: 'Nombre del negocio'
        },
        street: {
            element: 'input',
            id: 'street',
            isValid: false,
            touched: false,
            value: "",
            type: 'text',
            placeholder: 'Calle, Ciudad, Codigo Postal',
            disabled: true
        },
        description: {
            element: 'textarea',
            id: 'description',
            isValid: false,
            touched: false,
            value: "",
            type: 'text',
            placeholder: 'Descripción del negocio'
        },
    })

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showHorarioAlert, setShowHorarioAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(negocioData).length > 0) {
            setForm({
                ...form,
                name: { ...form['name'], value: negocioData.nombre, isValid: true },
                street: { ...form['street'], value: negocioData.direccion, isValid: true },
                description: { ...form['description'], value: negocioData.descripcion, isValid: true },
            });
            setCoordinates({ lat: geolocation.lat, lng: geolocation.lng })
        }
    }, [coordinates, geolocation, negocioData, form]);

    const handleContinue = () => {

        const openDays = props.days.filter(day => day.abierto === true)
        if (openDays.length < 1) {
            setShowHorarioAlert(true);
            setAlertMessage('Por favor, selecciona al menos un dia de trabajo')
            return;
        }

        const invalidOpenDays = openDays.find(day => day.horaAbierto === '' || day.horaCerrado === '');
        if (invalidOpenDays) {
            setShowHorarioAlert(true);
            setAlertMessage('Por favor, revisa el Horario de Trabajo')
            return;
        }


        if (!(form['name'].isValid && form['description'].isValid && form['street'].value !== "")) {
            setShowHorarioAlert(true);
            setAlertMessage('Entrada invalida, revisa tus datos.')
            return;
        }

        if (props.geolocation === '') {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
            }
            navigator.geolocation.getCurrentPosition((coords) => {
                props.onSetCoordinates({ lat: coords.coords.latitude, lng: coords.coords.longitude });
            }, (err) => {
                setShowHorarioAlert(true);
                setAlertMessage('Algo salio mal, por favor, vuelve a intentarlo');
                return;
            }, options);
        }

        props.goToNegPago()
        props.setNegocioData(form['name'].value, form['street'].value, form['description'].value);

    }

    const getLocation = () => {
        if (props.geolocation) { setShowBackdrop(true); return }

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

    const horarioError = (message) => {
        setAlertMessage(message);
        setShowHorarioAlert(true);
    }

    const getCoordinatesFromMap = (currentPosition, address) => {
        setCoordinates(currentPosition);
        props.onSetCoordinates(currentPosition);
        setForm({
            ...form,
            street: {
                ...form['street'],
                value: address
            }
        })
        setShowBackdrop(false);
    }

    const setValue = (input) => {

        const elementToUpdate = Object.keys(form).find(element => form[element].id === input.id);
        const updatedElement = {
            ...form[elementToUpdate]
        };

        if (!updatedElement.touched) updatedElement.touched = input.touched;
        updatedElement.value = input.value;
        updatedElement.isValid = input.isValid;

        const newForm = {
            ...form,
            [elementToUpdate]: updatedElement
        }
        setForm(newForm);
    }

    if (showHorarioAlert) {
        setTimeout(() => {
            setShowHorarioAlert(false);
        }, 5000)
    }

    return (
        <Fragment>
            {<Backdrop show={showBackdrop} clicked={() => setShowBackdrop(false)} />}
            {showBackdrop && (
                <ShowMap
                    nombre={form['name'].value}
                    coordinates={coordinates}
                    getCoords={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
                    address={form['description'].value}
                    closeBackdrop={() => setShowBackdrop(false)}
                />
            )}
            {showAlert &&
                (<Alert
                    title='Error'
                    clase={'personalInfo'}
                    clicked={() => setShowAlert(false)}
                >No se puede abrir el mapa por el momento. Intentelo mas tarde
                </Alert>)}
            {showHorarioAlert && <Alert title='Warning' clase={'personalInfo'} >{alertMessage} </Alert>}
            <div className={classes.NegocioInfo}>
                <div className={classes.header} >
                    <span>Datos del Negocio. Por favor llene los datos del negocio</span>
                </div>
                <div className={classes.card} >
                    <Card>
                        <div className={classes.form} >
                            {Object.keys(form).map(formElement => {

                                if (formElement === 'street') {
                                    return (
                                        <div key={formElement} className={classes.location} onClick={() => getLocation()}>
                                            <Input
                                                input={form[formElement]}
                                                setValue={(updatedElement) => setValue(updatedElement)}
                                            />
                                            <MapLogo />
                                        </div>
                                    )
                                } else {
                                    return <Input
                                        key={formElement}
                                        input={form[formElement]}
                                        setValue={(updatedElement) => setValue(updatedElement)}
                                    />
                                }

                            })}
                        </div>
                        <Table horarioError={(message) => horarioError(message)} />
                    </Card>
                </div>
                <div className={classes.buttons} >
                    <Button btnType='Success' clicked={() => handleContinue()} >
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
        negocioData: state.registro.negocioData,
        geolocation: state.registro.geolocation
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