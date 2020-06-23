import React, { useState } from 'react';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Card from '../../../UI/Card/Card';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

import classes from './ChangePassword.module.scss';

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

    return (
        <>
            <Backdrop show={true} />
            <div className={classes.card} >
                <Card >
                    <div className={classes.cardDetails} >
                        <h1>Cambiar contraseña</h1>
                        <div className={classes.form}>
                            {Object.keys(form).map(formElement => {
                                return (
                                    <div className={classes.element} >
                                        <Input
                                            input={form[formElement]}
                                            setValue={(updatedElement) => setValue(updatedElement)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className={classes.buttons} >
                            <Button btnType='Success' clicked={() => props.setView()} >GUARDAR</Button>
                            <Button btnType='Danger' clicked={() => props.setView()} >CANCELAR</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
};

export default ChangePassword;