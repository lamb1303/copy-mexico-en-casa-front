import React, { useState, Fragment, useEffect } from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import ImageUpload from '../../UI/ImageUpload/ImageUpload';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { ReactComponent as Efectivo } from '../../../assets/efectivo.svg';
import { ReactComponent as Tarjeta } from '../../../assets/tarjeta.svg';
import { ReactComponent as Local } from '../../../assets/local.svg';
import { ReactComponent as Domicilio } from '../../../assets/domicilio.svg';

import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import classes from './InfoNegPago.module.css';

const Metodo = props => {
    return (
        <div className={classes.pago} >
            <span>METODO DE {props.metodo}</span>
            <div className={classes.pagoMethod} >
                {props.children}
            </div>
        </div>
    )
}

const InfoNegPago = props => {

    const [photoINE, setPhotoINE] = useState();
    const [photoBusiness, setPhotoBusiness] = useState();
    const [acceptAviso, setAcceptAviso] = useState();

    const handleUpload = (id, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            if (id === 'negocio') {
                setPhotoBusiness(pickedFile);
            } else {
                setPhotoINE(pickedFile)
            }
        }
    }

    const handleContinue = () => {
        if (props.pagoTarjeta || props.pagoEfectivo) {
            if (props.entregaDomicilio || props.entregaNegocio) {
                if (photoINE !== undefined) {
                    console.log('Continue...')
                } else {
                    console.log('Foto del ID requerida')
                }
            }
        }
    }

    let isFormValid = false;
    if (props.pagoTarjeta || props.pagoEfectivo) {
        if (props.entregaDomicilio || props.entregaNegocio) {
            if (photoINE !== undefined && acceptAviso) {
                isFormValid = true;
            }
        }
    }

    let avisoPrivacidad;
    if (props.avisoPriv) {
        avisoPrivacidad = (
            <div className={classes.avisoP} >
                <Card>
                    <span className={classes.title} >Aviso de Privacidad</span>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </Card>
            </div>
        )
    }


    return (
        <Fragment>
            {<Backdrop show={props.avisoPriv} clicked={() => props.goToPrivacidad(false)} />}
            {props.avisoPriv && avisoPrivacidad}
            <div className={classes.negPago} >
                <div className={classes.header} >
                    <span>Hazle saber a tus clientes tu metodo de pago y metodo de entrega</span>
                </div>
                <div className={classes.card} >
                    <Card >
                        <Metodo metodo={'PAGO'}>
                            <Tarjeta
                                className={props.pagoTarjeta ? classes.selected : ''}
                                onClick={() => props.onPagoTarjeta()}
                            />
                            <Efectivo
                                className={props.pagoEfectivo ? classes.selected : ''}
                                onClick={() => props.onPagoEfectivo()}
                            />
                        </Metodo>
                        <Metodo metodo={'ENTREGA'}>
                            <Local
                                className={props.entregaNegocio ? classes.selected : ''}
                                onClick={() => props.onEntNegocio()}
                            />
                            <Domicilio
                                className={props.entregaDomicilio ? classes.selected : ''}
                                onClick={() => props.onEntDomicilio()}
                            />
                        </Metodo>
                        <div className={classes.uploads} >
                            <div className={classes.imageUpload} >
                                <span>Foto del negocio</span>
                                <ImageUpload
                                    img={photoINE}
                                    from='registro'
                                    center
                                    btnType='Success'
                                    message='Seleccionar foto'
                                    id='negocio'
                                    onInput={(id, pickedFile, fileIsValid) => handleUpload(id, pickedFile, fileIsValid)}
                                />
                            </div>
                            <div className={classes.imageUpload}>
                                <span>Identificacion Oficial</span>
                                <ImageUpload
                                    img={photoBusiness}
                                    from='registro'
                                    center
                                    btnType='Success'
                                    message='Seleccionar foto'
                                    id='ID'
                                    onInput={(id, pickedFile, fileIsValid) => handleUpload(id, pickedFile, fileIsValid)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={classes.aviso} >
                    <input type='checkbox' onChange={event => setAcceptAviso(event.target.checked)} />
                    <span>
                        Acepto <span onClick={() => props.goToPrivacidad(true)} className={classes.privacidad} >aviso de privacidad</span>
                    </span>
                </div>
                <div className={classes.buttons} >
                    <Button
                        btnType='Success'
                        clicked={() => handleContinue()}
                        disabled={!isFormValid}
                    >
                        CONTINUAR
            </Button>
                    <Button btnType='Danger' clicked={() => props.goToInfoNegocio()} >
                        CANCELAR
            </Button>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        pagoEfectivo: state.registro.pagoEfectivo,
        pagoTarjeta: state.registro.pagoTarjeta,
        entregaDomicilio: state.registro.entregaDomicilio,
        entregaNegocio: state.registro.entregaNegocio,
        idImage: state.registro.idImage,
        negocioImage: state.registro.negocioImage,
        avisoPriv: state.registro.avisoPriv,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        onPagoTarjeta: () => dispatch(actions.pagoTarjeta()),
        onPagoEfectivo: () => dispatch(actions.pagoEfectivo()),
        onEntDomicilio: () => dispatch(actions.entregaDomicilio()),
        onEntNegocio: () => dispatch(actions.entregaNegocio()),
        goToPrivacidad: (isOpen) => dispatch(actions.goToPrivacidad(isOpen))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoNegPago);