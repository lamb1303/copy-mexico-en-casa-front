import React, { useState } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import ChangePassword from './ChangePassword/ChangePassword';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './EditClient.module.scss';

const EditClient = props => {

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
            placeholder: 'Dirección'
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
            value: props.client.reference,
            type: 'text',
            placeholder: 'Entre calle y calle, Color de casa...'
        },
    });
    const [cancelEdit, setCancelEdit] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

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
            {viewPassword && <ChangePassword setView={() => setViewPassword(false)} />}
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
                            <div className={classes.password} onClick={() => setViewPassword(true)} >
                                cambiar contraseña
                            </div>
                        </div>
                        <div className={classes.buttons} >
                            <Button btnType='Success' >GUARDAR</Button>
                            <Button btnType='Danger' clicked={() => setCancelEdit(true)} >CANCELAR</Button>
                        </div>
                    </div >
                )}
        </>
    )
};

const mapStateToProps = state => {
    return {
        client: state.cliente.cliente
    }
}

export default connect(mapStateToProps)(EditClient);