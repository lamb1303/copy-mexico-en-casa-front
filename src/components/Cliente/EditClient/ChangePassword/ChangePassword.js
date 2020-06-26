import React, { useState } from 'react';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Card from '../../../UI/Card/Card';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Alert from '../../../UI/Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions';

import classes from './ChangePassword.module.scss';
import { connect } from 'react-redux';

const alertObject = {
    message: '',
    show: false
}

const ChangePassword = props => {

    const [form, setForm] = useState({
        password: {
            element: 'input',
            label: 'Contraseña anterior',
            isValid: false,
            touched: false,
            value: '',
            type: 'password',
            placeholder: 'Contraseña'
        },
        newPassword: {
            element: 'input',
            label: 'Nueva contraseña',
            isValid: false,
            touched: false,
            value: '',
            type: 'password',
            placeholder: 'nueva contraseña'
        },
        confirmPassword: {
            element: 'input',
            label: 'Confirmar nueva contrasena',
            isValid: false,
            touched: false,
            value: '',
            type: 'password',
            placeholder: 'Confirmar contraseña'
        },
    })
    const [alert, setAlert] = useState(alertObject)

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

    const checkValidity = async () => {
        if (!form['password'].isValid) return false;
        if (!form['newPassword'].isValid) return false;
        if (!form['confirmPassword'].isValid) return false;
        return true;
    }

    const handleUpdate = async () => {
        if (props.error) return;
        const formIsValid = await checkValidity();
        if (!formIsValid) {
            setAlert({ message: 'Por favor, completa todos los campos', show: true })
            return;
        }

        if (form['confirmPassword'].value !== form['newPassword'].value) {
            setAlert({ message: 'La nueva contraseña no coincide con la Confirmacion de contraseña', show: true })
            return;
        }

        props.updatePassword({
            current: form['password'].value,
            newP: form['newPassword'].value,
        }, props.id);
    }

    if (alert.show) {
        setTimeout(() => {
            setAlert(alertObject);
        }, 3000);
    }

    return (
        <>
            <Backdrop show={true} />
            {props.loading && <Spinner />}
            {alert.show && <Alert title='Warning' >{alert.message}</Alert>}
            {props.error && <Alert title='Warning' >'Ups! Algo salio mal. Por favor, intentalo mas tarde'</Alert>}
            <div className={classes.card} >
                {!props.loading &&
                    <Card >
                        <div className={classes.cardDetails} >
                            <h1>Cambiar contraseña</h1>
                            <div className={classes.form}>
                                {Object.keys(form).map(formElement => {
                                    return (
                                        <div key={form[formElement].label} className={classes.element} >
                                            <Input
                                                input={form[formElement]}
                                                setValue={(updatedElement) => setValue(updatedElement)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={classes.buttons} >
                                <Button
                                    btnType='Success'
                                    clicked={() => handleUpdate()}
                                    disabled={props.error}
                                >GUARDAR</Button>
                                <Button btnType='Danger' clicked={() => props.setView()} >CANCELAR</Button>
                            </div>
                        </div>
                    </Card>
                }
            </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.cliente.loading,
        id: state.home.id,
        error: state.cliente.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePassword: (newCred, id) => dispatch(actions.updateClientPassword(newCred, id)),
        setError: () => dispatch(actions.setClientError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);