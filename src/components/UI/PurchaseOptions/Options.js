import React from 'react';

import { ReactComponent as Local } from '../../../assets/local.svg';
import { ReactComponent as Domicilio } from '../../../assets/domicilio.svg';
import { ReactComponent as Efectivo } from '../../../assets/efectivo.svg';
import { ReactComponent as Tarjeta } from '../../../assets/tarjeta.svg';


import classes from './Options.module.css';

const purchaseOptions = props => {

    return (<div className={classes.options} >
        <div className={classes.delivery} >
            {props.isToGo ? <Local /> : <Domicilio />}
        </div>
        <div className={classes.pay} >
            {(props.cash && !props.creditCard) &&
                <Efectivo />
            }
            {
                (!props.cash && props.creditCard) &&
                <Tarjeta />
            }
            {
                (props.cash && props.creditCard) &&
                <>
                    <Tarjeta />
                    <Efectivo />
                </>
            }
        </div>
    </div>)
}

export default purchaseOptions;