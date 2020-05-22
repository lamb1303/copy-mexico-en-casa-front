import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

// import Button from '../Button/Button';

import './Alert.scss';


//posible title values: 
//Error
//Warning
//Info
//Success



const AlertComponent = props => {

    return <Alert className='alert' severity={props.title.toLowerCase()}>
        <button href="" onClick={() => props.updateError()}> X </button>
        <AlertTitle>{props.title}</AlertTitle>
        {props.children}
    </Alert>
}

const mapStateToProps = state => {
    return {
        error: state.home.error,
    }
}


export default connect(mapStateToProps)(AlertComponent);