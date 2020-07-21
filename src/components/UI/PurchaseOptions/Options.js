import React from 'react';

import { ReactComponent as Local } from '../../../assets/local.svg';
import { ReactComponent as Domicilio } from '../../../assets/domicilio.svg';
import { ReactComponent as Efectivo } from '../../../assets/efectivo.svg';
import { ReactComponent as Tarjeta } from '../../../assets/tarjeta.svg';


import classes from './Options.module.css';

const purchaseOptions = props => {

    return (<div className={classes.options} >
        <div className={classes.delivery} >
            {props.isToGo && <Domicilio />}
            {props.isToTake && <Local />}
        </div>
        <div className={classes.pay} >
            {props.cash && <Efectivo />}
            {props.creditCard && <Tarjeta />}
        </div>
    </div>)
}

export default purchaseOptions;