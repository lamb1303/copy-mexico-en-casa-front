import React from 'react';
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

    const handleUpload = (id, pickedFile, fileIsValid) => {
        if (fileIsValid) {
            console.log(id);
            console.log(pickedFile);
        }
    }

    return (
        <div className={classes.negPago} >
            <div className={classes.header} >
                <span>Hazle saber a tus clientes tu metodo de pago y metodo de entrega</span>
            </div>
            <div className={classes.card} >
                <Card>
                    <Metodo metodo={'PAGO'}>
                        <Tarjeta />
                        <Efectivo />
                    </Metodo>
                    <Metodo metodo={'ENTREGA'}>
                        <Local />
                        <Domicilio />
                    </Metodo>
                    <div className={classes.uploads} >
                        <ImageUpload
                            from='registro'
                            center
                            btnType='Success'
                            message='Seleccionar foto'
                            id='negocio'
                            onInput={(id, pickedFile, fileIsValid) => handleUpload(id, pickedFile, fileIsValid)}
                        />
                        <ImageUpload
                            from='registro'
                            center
                            btnType='Success'
                            message='Seleccionar foto'
                            id='ID'
                            onInput={(id, pickedFile, fileIsValid) => handleUpload(id, pickedFile, fileIsValid)}
                        />
                    </div>
                </Card>
            </div>
            <div className={classes.buttons} >
                <Button btnType='Success' clicked={() => props.goToPrivacidad()} >
                    CONTINUAR
            </Button>
                <Button btnType='Danger' clicked={() => props.goToInfoNegocio()} >
                    CANCELAR
            </Button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        goToPrivacidad: () => dispatch(actions.goToPrivacidad())
    }
}

export default connect(null, mapDispatchToProps)(InfoNegPago);