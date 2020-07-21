import React, { useState, useEffect } from 'react';
import classes from './EditBusiness.module.scss';
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
import ChangePassword from '../../../../Cliente/EditClient/ChangePassword/ChangePassword';

const baseObject = {
    isValid: true,
    touched: false,
    value: false
}

const EditBusiness = props => {

    const { updatedPsw } = props;

    const [name, setName] = useState(baseObject)
    const [desciption, setDesciption] = useState(baseObject)
    const [address, setAddress] = useState(baseObject)
    const [phone, setPhone] = useState(baseObject)
    const [days, setDays] = useState(props.selectedNegocio.schedule)
    const [delivery, setDelivery] = useState(props.selectedNegocio.delivery)
    const [payment, setPayment] = useState(props.selectedNegocio.payment)
    const [error, setError] = useState({ message: '', visible: false })
    const [cancel, setCancel] = useState(false)
    const [viewPassword, setViewPassword] = useState(false);
    const [isPwdUpdate, setIsPwdUpdate] = useState(false);
    const [coordinates, setCoordinates] = useState(props.selectedNegocio.geolocation);



    let init;
    if (Object.keys(props.selectedNegocio).length < 1) init = <Redirect to='/Negocio' />

    const cancelHandler = () => {
        setName(baseObject)
        setDesciption(baseObject)
        setAddress(baseObject)
        setPhone(baseObject)
        setDays(props.selectedNegocio.schedule)
        setDelivery(props.selectedNegocio.delivery)
        setPayment(props.selectedNegocio.payment)
        setError({ message: '', visible: false })
        setCancel(true);
    }

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
            payment: payment,
            geolocation: coordinates
        }

        props.updateBusiness(updatedBusiness, props.id, props.isCustomer);

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

    const updatePasswordHandler = () => {
        if (props.updatedPsw) {
            setError({ message: 'Para cambiar nuevamente la contraseña, intentelo mas tarde', visible: true, type: 'Success' })
            return;
        }
        setViewPassword(true);
    }

    if (alert.show) {
        setTimeout(() => {
            setError({ message: '', visible: false })
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
        setAddress({ value: address, touched: true, isValid: true })
    }

    return (
        <>
            {init}
            {cancel && <Redirect to='/negocio' />}
            {props.loading && (
                <>
                    <Backdrop visible={props.loading} />
                    <Spinner />
                </>
            )}
            {(viewPassword && !props.updatedPsw) && <ChangePassword loading={props.loading} error={props.error} setView={() => setViewPassword(false)} />}
            {props.updated && <Redirect to='/negocio' />}
            {error.visible && <Alert title='Warning' > {error.message} </Alert>}
            {isPwdUpdate && <Alert title='Success' > Se cambio la contraseña exitosamente </Alert>}

            <div className={classes.editBusiness} >
                <GeneralData
                    name={name} setName={(value) => setName(value)}
                    desciption={desciption} setDesciption={(value) => setDesciption(value)}
                    address={address} setAddress={(value) => setAddress(value)}
                    phone={phone} setPhone={(value) => setPhone(value)}
                    coordinates={coordinates} setCoordinates={(coords) => setCoordinates(coords)}
                    getCoordinatesFromMap={(currentPosition, address) => getCoordinatesFromMap(currentPosition, address)}
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
                <div className={classes.password} onClick={() => updatePasswordHandler()} >
                    cambiar contraseña
                </div>
                <div className={classes.buttons} >
                    <Button btnType='Success' clicked={() => saveAll()} >GUARDAR</Button>
                    <Button btnType='Danger' clicked={() => cancelHandler()} >CANCELAR</Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedNegocio: state.negocio.selectedNegocio,
        id: state.home.id,
        isCustomer: state.home.isCustomer,
        loading: state.negocio.loading,
        updated: state.negocio.updated,
        updatedPsw: state.negocio.updatedPsw,
        error: state.negocio.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBusiness: (business, id, isCustomer) => dispatch(actions.updateBusiness(business, id, isCustomer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBusiness);