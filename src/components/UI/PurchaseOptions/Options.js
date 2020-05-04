import React from 'react';

import domicilio from '../../../assets/domicilio.PNG';
import { ReactComponent as Local } from '../../../assets/local.svg';
import efectivo from '../../../assets/efectivo.PNG';
import tarjeta from '../../../assets/tarjeta.PNG';

import classes from './Options.module.css';

const purchaseOptions = props => {

    return (<div className={classes.options} >
        <div className={classes.delivery} >
            {props.envio === 'Domicilio' ? <img alt='domicilio' src={domicilio} />
                : <Local />}
        </div>
        <div className={classes.pay} >
            {props.pago === 'Efectivo' ? <img alt='efectivo' src={efectivo} />
                : <img alt='tarjeta' src={tarjeta} />}
        </div>
    </div>)
}

export default purchaseOptions;