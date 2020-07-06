import React from 'react';
// import RegBienvenida from './RegBienvenida';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';
import NegocioInfo from './NegocioInfo';
import InfoNegPago from './InfoNegPago';
import { Redirect } from 'react-router-dom';
import classes from './RegistroNegocio.module.css';

const RegistroNegocio = props => {

    let stage = <PersonalInfo />;
    if (props.negocioInfo) {
        stage = <NegocioInfo />
    } else if (props.negocioFinal) {
        stage = <InfoNegPago />
    }

    return (
        <div className={classes.registro} >
            {props.redirect && <Redirect to='/Negocio' />}
            <div className={classes.background}></div>
            {stage}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        personalInfo: state.registro.personalInfo,
        negocioInfo: state.registro.negocioInfo,
        negocioFinal: state.registro.negocioFinal,
        redirect: state.home.id
    }
}

export default connect(mapStateToProps)(RegistroNegocio);