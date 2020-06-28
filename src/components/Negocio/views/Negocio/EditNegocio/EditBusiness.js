import React, { useState } from 'react';
import classes from './EditBusiness.module.css';
import GeneralData from './GeneralData/GeneralData';
import Schedule from './Schedule/Schedule';
import Methods from './Methods/Methods';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Alert from '../../../../UI/Alert/Alert';
import Button from '../../../../UI/Button/Button';
import Spinner from '../../../../UI/Spinner/Spinner';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import * as actions from '../../../../../store/actions';

const baseObject = {
    isValid: true,
    touched: false,
    value: false
}

const EditBusiness = props => {

    const [name, setName] = useState(baseObject)
    const [desciption, setDesciption] = useState(baseObject)
    const [address, setAddress] = useState(baseObject)
    const [phone, setPhone] = useState(baseObject)
    const [days, setDays] = useState(props.selectedNegocio.schedule)
    const [delivery, setDelivery] = useState(props.selectedNegocio.delivery)
    const [payment, setPayment] = useState(props.selectedNegocio.payment)
    const [error, setError] = useState({ message: '', visible: false })
    const [cancel, setCancel] = useState(false)

    let init;
    if (Object.keys(props.selectedNegocio).length < 1) init = <Redirect to='/Negocio' />

    // const cancel = () => {
    //     setName(baseObject)
    //     setDesciption(baseObject)
    //     setAddress(baseObject)
    //     setPhone(baseObject)
    //     setDays(props.selectedNegocio.schedule)
    //     setDelivery(props.selectedNegocio.delivery)
    //     setPayment(props.selectedNegocio.payment)
    //     setError({ message: '', visible: false })
    // }

    const saveAll = () => {

        if (!(name.isValid &&
            desciption.isValid &&
            address.isValid &&
            phone.isValid)) {
            setError({ message: 'Por favor, verifica tus datos.', visible: true })
            return;
        }

        const atLeastOneOpen = days.filter(day => day.abierto === true);
        if (!atLeastOneOpen) {
            setError({ message: 'Debe trabajar al menos un dia.', visible: true })
            return;
        }

        const invalidDay = atLeastOneOpen.find(item => item.horaAbierto === '' || item.horaCerrado === '')
        if (invalidDay) {
            setError({ message: `Por favor, revise el horario del dia: ${invalidDay.dia}`, visible: true })
            return;
        }

        const invalidDelivery = Object.keys(delivery).find(item => delivery[item] === true);
        if (!invalidDelivery) {
            setError({ message: 'Selecciona al menos un metodo de entrega.', visible: true })
            return;
        }

        const invalidPayment = Object.keys(payment).find(item => payment[item] === true);
        if (!invalidPayment) {
            setError({ message: 'Selecciona al menos un metodo de Pago.', visible: true })
            return;
        }

        const updatedBusiness = {
            businessName: name.value ? name.value : props.selectedNegocio.businessName,
            businessDesc: desciption.value ? desciption.value : props.selectedNegocio.businessDesc,
            address: address.value ? address.value : props.selectedNegocio.address,
            mobile: phone.value ? phone.value : props.selectedNegocio.mobile,
            schedule: days,
            delivery: delivery,
            payment: payment
        }

        props.updateBusiness(updatedBusiness, props.id);

    }

    const setOpen = (isOpen, id) => {
        let dia = days.find(day => day.id === id);
        if (!isOpen) {
            dia.horaAbierto = "";
            dia.horaCerrado = "";
        }
        dia.abierto = isOpen;
        const tempDays = days.filter(day => day.id !== id);
        tempDays.push(dia);
        tempDays.sort((a, b) => a.id - b.id);
        setDays(tempDays)
    }

    const handleHours = (value, state, id) => {
        let dia = days.find(day => day.id === id);
        if (state === 'abierto') {
            dia.horaAbierto = value
        } else {
            dia.horaCerrado = value
        };
        dia.abierto = true;
        const tempDays = days.filter(day => day.id !== id);
        tempDays.push(dia);
        tempDays.sort((a, b) => a.id - b.id);
        setDays(tempDays);
    }

    const handleClose = (value, day) => {
        if (day.horaAbierto === "") handleHours(value, 'cerrado', day.id)
        else {
            if (day.horaAbierto < value) handleHours(value, 'cerrado', day.id)
            else setError({ message: 'El horario de cerrado debe ser DESPUES del horario de abierto', visible: true })
        }
    }

    const handleOpen = (value, day) => {
        if (day.horaCerrado === "") handleHours(value, 'abierto', day.id)
        else {
            if (day.horaCerrado > value) handleHours(value, 'abierto', day.id)
            else setError({ message: 'El horario de abierto debe ser ANTES del horario de cerrado', visible: true })
        }
    }

    if (error.visible) {
        setTimeout(() => setError({ ...error, visible: false }), 3000)
    }

    return (
        <>
            {init}
            {cancel && <Redirect to='/negocio' />}
            {props.loading && (
                <>
                    <Backdrop show={props.loading} />
                    <Spinner />
                </>
            )}
            {props.updated && <Redirect to='/negocio' />}
            {error.visible && <Alert title='Warning'> {error.message} </Alert>}
            <div className={classes.editBusiness} >
                <GeneralData
                    name={name} setName={(value) => setName(value)}
                    desciption={desciption} setDesciption={(value) => setDesciption(value)}
                    address={address} setAddress={(value) => setAddress(value)}
                    phone={phone} setPhone={(value) => setPhone(value)}
                />
                <Schedule
                    days={days}
                    setOpen={(isOpen, id) => setOpen(isOpen, id)}
                    handleClose={(value, day) => handleClose(value, day)}
                    handleOpen={(value, day) => handleOpen(value, day)}
                />
                <Methods
                    setPayment={(type, value) => setPayment({ ...payment, [type]: value })}
                    setDelivery={(type, value) => setDelivery({ ...delivery, [type]: value })}
                    payment={payment}
                    delivery={delivery}
                />
                <div className={classes.buttons} >
                    <Button btnType='Success' clicked={() => saveAll()} >GUARDAR</Button>
                    <Button btnType='Danger' clicked={() => setCancel(true)} >CANCELAR</Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedNegocio: state.negocio.selectedNegocio,
        id: state.home.id,
        loading: state.negocio.loading,
        updated: state.negocio.updated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBusiness: (business, id) => dispatch(actions.updateBusiness(business, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBusiness);