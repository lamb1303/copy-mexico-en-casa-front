import React from 'react';
import Alert from '@material-ui/core/Alert';

//posible severity values: 
//error
//warning
//info
//success

const Alert = props => {
    return <Alert severity={props.severity}>
        {props.message}
    </Alert>
}

export default Alert;