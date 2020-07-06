import React from 'react';
import { ReactComponent as Cash } from '../../../../../../assets/efectivo.svg';
import { ReactComponent as Card } from '../../../../../../assets/tarjeta.svg';
import { ReactComponent as Home } from '../../../../../../assets/local.svg';
import { ReactComponent as ToGo } from '../../../../../../assets/domicilio.svg';
import classes from './Methods.module.css';

const Methods = props => {
    return (
        <>
            {props.payment &&
                <div className={classes.methods} >
                    <div className={classes.money} >
                        <div className={classes.label} >{`Método de pago:`}</div>
                        <div className={classes.icons} >
                            <Cash
                                onClick={() => props.setPayment('cash', !props.payment.cash)}
                                className={props.payment.cash ? classes.selected : ''}
                            />
                            <Card
                                onClick={() => props.setPayment('creditCard', !props.payment.creditCard)}
                                className={props.payment.creditCard ? classes.selected : ''}
                            />
                        </div>
                    </div>
                    <div className={classes.delivery} >
                        <div className={classes.label}>{`Método de entrega:`}</div>
                        <div className={classes.icons} >
                            <Home
                                onClick={() => props.setDelivery('isToTake', !props.delivery.isToTake)}
                                className={props.delivery.isToTake ? classes.selected : ''}
                            />
                            <ToGo
                                onClick={() => props.setDelivery('isToGo', !props.delivery.isToGo)}
                                className={props.delivery.isToGo ? classes.selected : ''}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Methods