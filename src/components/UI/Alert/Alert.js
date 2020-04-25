import React from 'react';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';

//posible severity values: 
//error
//warning
//info
//success

//posible title values: 
//Error
//Warning
//Info
//Success

const Alert = props => {

    return <Alert severity={props.title.toLowerCase()}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
    </Alert>
}

export default Alert;