import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
// import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import './Alert.scss';


//posible title values: 
//Error
//Warning
//Info
//Success



const AlertComponent = props => {

    return <Alert className={`alert ${props.clase}`} severity={props.title.toLowerCase()}>
        <button href="" onClick={ props.clicked }> X </button>
        <AlertTitle>{props.title}</AlertTitle>
        {props.children}
    </Alert>
}


export default connect(null)(AlertComponent);