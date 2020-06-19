import React from 'react';
import classes from './GeneralData.module.css';
import { connect } from 'react-redux';

const GeneralData = props => {

    const rules = (value, type) => {
        switch (type) {
            case 'text': return value.length > 5;
            case 'password': return value.length >= 8;
            case 'email': return /^\S+@\S+\.\S+$/.test(value);
            case 'number': return value.length >= 10;
            default: return false;
        }
    }

    const handleInput = (value, id) => {
        switch (id) {
            case 'name':
                props.setName({ value: value, touched: true, isValid: rules(value, 'text') })
                break;
            case 'description':
                props.setDesciption({ value: value, touched: true, isValid: rules(value, 'text') })
                break;
            case 'address':
                props.setAddress({ value: value, touched: true, isValid: rules(value, 'text') })
                break;
            case 'phone':
                if (value.length >= 11) return;
                props.setPhone({ value: value, touched: true, isValid: rules(value, 'number') })
                break;
            default: return;
        }
    }

    return (
        <div className={classes.general} >
            <img
                alt='Negocio'
                className={classes.fotoNegocio}
                src={props.selectedNegocio.photoBusiness}
            />
            <div className={classes.form} >
                <div className={classes.input} >
                    <label>Nombre:</label>
                    <input
                        className={`${props.name.isValid ? props.name.touched ? classes.good : '' : classes.bad}`}
                        value={props.name.value ? props.name.value : props.name.value === '' ? '' : props.selectedNegocio.businessName}
                        type='text' placeholder='Nombre'
                        onChange={(event) => handleInput(event.target.value, 'name')}
                    />
                </div>
                <div className={classes.input}>
                    <label>{'Descripción:'}</label>
                    <textarea
                        className={`${props.desciption.isValid ? props.desciption.touched ? classes.good : '' : classes.bad}`}
                        value={props.desciption.value ? props.desciption.value : props.desciption.value === '' ? '' : props.selectedNegocio.businessDesc}
                        type='text'
                        placeholder='Descripción'
                        onChange={(event) => handleInput(event.target.value, 'description')}
                    />
                </div>
                <div className={classes.input} >
                    <label>{'Dirección:'}</label>
                    <input
                        className={`${props.address.isValid ? props.address.touched ? classes.good : '' : classes.bad}`}
                        value={props.address.value ? props.address.value : props.address.value === '' ? '' : props.selectedNegocio.address}
                        type='text'
                        placeholder='Calle, Ciudad, C.P.'
                        onChange={(event) => handleInput(event.target.value, 'address')}
                    />
                </div>
                <div className={classes.input} >
                    <label>{'Teléfono'}:</label>
                    <input
                        className={`${props.phone.isValid ? props.phone.touched ? classes.good : '' : classes.bad}`}
                        value={props.phone.value ? props.phone.value : props.phone.value === '' ? '' : props.selectedNegocio.mobile}
                        type='number'
                        placeholder='Telefono'
                        onChange={(event) => handleInput(event.target.value, 'phone')}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedNegocio: state.negocio.selectedNegocio
    }
}

export default connect(mapStateToProps)(GeneralData);