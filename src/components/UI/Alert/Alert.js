import React, { useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import './Alert.scss';


//posible title values: 
//Error
//Warning
//Info
//Success



const AlertComponent = props => {
    const { closeAlert, isActive } = props

    useEffect(() => {
        console.log("alert in alert"+isActive);
        if (isActive) {
            setTimeout(() => closeAlert(), 3000)
        }

    }, [closeAlert, isActive])

    return (
        < Alert className={`alert ${props.clase}`
        } severity={props.title.toLowerCase()} >
            <AlertTitle>{props.title}</AlertTitle>
            {props.children}
        </Alert >
    )
}


export default AlertComponent;