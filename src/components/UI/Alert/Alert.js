import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';


//posible title values: 
//Error
//Warning
//Info
//Success

const AlertComponent = props => {

    return <Alert severity={props.title.toLowerCase()}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.children}
    </Alert>
}

export default AlertComponent;