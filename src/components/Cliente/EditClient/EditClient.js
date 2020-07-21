import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ShowMap from '../../UI/ShowMap/ShowMap';
import Alert from '../../UI/Alert/Alert';
import { ReactComponent as MapLogo } from '../../../assets/map.svg';
import axios from '../../../axios';

import ChangePassword from './ChangePassword/ChangePassword';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

import classes from './EditClient.module.scss';

const EditClient = props => {

    const { updatedPsw } = props;
    
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [coordinates, setCoordinates] = useState(props.client.geolocation);
    const [form, setForm] = useState({
        name: {
            element: 'input',
            label: 'Nombre',
            isValid: true,
            touched: false,
            value: props.client.name,
            type: 'text',
            placeholder: 'Nombre'
        },
        lastName: {
            element: 'input',
            label: 'Apellidos',
            isValid: true,
            touched: false,
            value: props.client.apellidos,
            type: 'text',
            placeholder: 'Apellidos'
        },
        direction: {
            element: 'input',
            label: 'Dirección',
            isValid: true,
            touched: false,
            value: props.client.direccion,
            type: 'text',
            placeholder: 'Calle, Número, Ciudad, C.P. ',
            disabled: true
        },
        phone: {
            element: 'input',
            label: 'Teléfono',
            isValid: true,
            touched: false,
            value: props.client.telefono,
            type: 'number',
            placeholder: 'Teléfono'
        },
        reference: {
            element: 'textarea',
            label: 'Referencia',
            isValid: props.client.reference ? true : false,
            touched: false,
            value: props.client.reference ? props.client.reference : '',
            type: 'text',
            placeholder: 'Entre calle y calle, Color de casa...'
        },
    });
    const [cancelEdit, setCancelEdit] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [alert, setAlert] = useState({ message: '', show: false });
    const [isPwdUpdate, setIsPwdUpdate] = useState(false);

    const setValue = (input) => {

        const elementToUpdate = Object.keys(form).find(element => form[element].label === input.label);
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

    const checkValidity = () => {
        if (!form['name'].isValid) return false;
        if (!form['lastName'].isValid) return false;
        if (!form['direction'].isValid) return false;
        if (!form['phone'].isValid) return false;
        if (form['reference'].value !== '') {
            if (!form['reference'].isValid) return false;
        }
        return true;
    }

    const checkChanges = async () => {
        let reference = props.client.reference;
        if (reference === undefined) reference = '';

        if (props.client.name === form['name'].value &&
            props.client.apellidos === form['lastName'].value &&
            props.client.direccion === form['direction'].value &&
            props.client.telefono === form['phone'].value &&
            reference === form['reference'].value
        ) return false;
        return true;
    }

    const handleSaveButton = async () => {
        const formIsValid = checkValidity();
        if (!formIsValid) {
            setAlert({ message: 'Por favor, revisa que tus datos sean correctos.', show: true });
            return;
        }

        const hasChanges = await checkChanges();
        if (!hasChanges) {
            setCancelEdit(true);
            return;
        }

        const client = {
            name: form['name'].value,
            apellidos: form['lastName'].value,
            direccion: form['direction'].value,
            telefono: form['phone'].value,
            reference: form['reference'].value,
            geolocation: coordinates
        }
        props.updateClient(client, props.id);
    }

    const updatePasswordHandler = () => {
        if (props.updatedPsw) {
            setAlert({ message: 'Para cambiar nuevamente la contraseña, intentelo mas tarde', show: true, type: 'Success' })
            return;
        }
        setViewPassword(true);
    }

    if (alert.show) {
        setTimeout(() => {
            setAlert({ message: '', show: false })
        }, 3000);
    }


    useEffect(() => {
        updatedPsw &&
            setIsPwdUpdate(true);
    }, [updatedPsw]);

    if (isPwdUpdate) {
        setTimeout(() => {
            setIsPwdUpdate(false);
        }, 3000);
    }

    const getCoordinatesFromMap = (currentPosition, address) => {
        setCoordinates(currentPosition);
        setForm({
            ...form,
            direction: {
                ...form['direction'],
                value: address
            }
        })
        setShowBackdrop(false);
    }


    return (
        <>
            {alert.show && <Alert title='Warning'> {alert.message} </Alert>}
            {isPwdUpdate && <Alert title='Success' > Se cambio la contraseña exitosamente </Alert>}
            {showBackdrop && (
                <>
                <Backdrop show={showBackdrop} clicked={() => setShowBackdrop(false)} />
                <ShowMap
                    nombre={form['name'].value}
                    coordinates={coordinates}
                    getCoords={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
                    address={form['direction'].value}
                    closeBackdrop={()=> setShowBackdrop(false)}
                />
                </>
            )}
            {props.updated && <Redirect to='/Cliente' />}
            {props.loading && <> <Backdrop show={props.loading} /> <Spinner /> </>}
            {(viewPassword && !props.updatedPsw) && <ChangePassword loading={props.loading} error={props.error} setView={() => setViewPassword(false)} />}
            {cancelEdit && <Redirect to='/Client' />}
            {!props.client ? <Redirect to='/Client' /> :
                (
                    <div className={classes.editClient} >
                        <div className={classes.clientDetails} >
                            <div className={classes.avatar} >
                                <span>{props.client.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <form>
                                {Object.keys(form).map(formElement => {
                                    if (formElement === 'direction') {
                                        return <div key={formElement} className={classes.location} onClick={() => setShowBackdrop(true)}>
                                            <Input
                                                input={form[formElement]}
                                                setValue={(updatedElement) => setValue(updatedElement)}
                                            />
                                            <MapLogo />
                                        </div>
                                    }
                                    return (
                                        <div className={classes.inputBox} key={form[formElement].label} >
                                            <Input
                                                input={form[formElement]}
                                                setValue={(updatedElement) => setValue(updatedElement)}
                                            />
                                        </div>
                                    )
                                })}
                            </form>
                            <div className={classes.password} onClick={() => updatePasswordHandler()} >
                                cambiar contraseña
                            </div>
                        </div>
                        <div className={classes.buttons} >
                            <Button btnType='Success' clicked={() => handleSaveButton()} >GUARDAR</Button>
                            <Button btnType='Danger' clicked={() => setCancelEdit(true)} >CANCELAR</Button>
                        </div>
                    </div >
                )}
        </>
    )
};

const mapStateToProps = state => {
    return {
        client: state.cliente.cliente,
        id: state.home.id,
        loading: state.cliente.loading,
        error: state.cliente.error,
        updated: state.cliente.updated,
        updatedPsw: state.cliente.updatedPsw,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateClient: (client, id) => dispatch(actions.updateClient(client, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);