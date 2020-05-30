import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import ImageUpload from '../../UI/ImageUpload/ImageUpload';
import { ReactComponent as Efectivo } from '../../../assets/efectivo.svg';
import { ReactComponent as Tarjeta } from '../../../assets/tarjeta.svg';
import { ReactComponent as Local } from '../../../assets/local.svg';
import { ReactComponent as Domicilio } from '../../../assets/domicilio.svg';
import * as actions from '../../../store/actions';
import classes from './InfoNegPago.module.css';
import { connect } from 'react-redux';

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

    const { idImage, negocioImage } = props;
    const [image, setImage] = useState();

    const handleUpload = (id, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            if (id === 'negocio') {
                props.setFotoNegocio(pickedFile);
                console.log(pickedFile);
            } else {
                setImage(pickedFile);
                console.log(pickedFile);
            }
        }
    }

    const handleContinue = () => {
        if (props.pagoTarjeta || props.pagoEfectivo) {
            if (props.entregaDomicilio || props.entregaNegocio) {
                if (image !== undefined) {
                    props.goToPrivacidad();
                    console.log('Subiendo al reducer...')
                    props.setFotoId(image);
                } else {
                    console.log('Foto del ID requerida')
                }
            }
        }
    }

    let isFormValid = false;
    if (props.pagoTarjeta || props.pagoEfectivo) {
        if (props.entregaDomicilio || props.entregaNegocio) {
            if (image !== undefined) {
                isFormValid = true;
            }
        }
    }

    return (
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
                                img={image}
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
                                img={negocioImage}
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
    )
};

const mapStateToProps = state => {
    return {
        pagoEfectivo: state.registro.pagoEfectivo,
        pagoTarjeta: state.registro.pagoTarjeta,
        entregaDomicilio: state.registro.entregaDomicilio,
        entregaNegocio: state.registro.entregaNegocio,
        idImage: state.registro.idImage,
        negocioImage: state.registro.negocioImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        goToPrivacidad: () => dispatch(actions.goToPrivacidad()),
        onPagoTarjeta: () => dispatch(actions.pagoTarjeta()),
        onPagoEfectivo: () => dispatch(actions.pagoEfectivo()),
        onEntDomicilio: () => dispatch(actions.entregaDomicilio()),
        onEntNegocio: () => dispatch(actions.entregaNegocio()),
        setFotoNegocio: (foto) => dispatch(actions.setFotoNegocio(foto)),
        setFotoId: (foto) => dispatch(actions.setFotoId(foto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoNegPago);