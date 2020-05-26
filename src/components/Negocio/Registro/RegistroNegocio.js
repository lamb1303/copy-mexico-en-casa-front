import React from 'react';
import RegBienvenida from './RegBienvenida';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';
import NegocioInfo from './NegocioInfo';
import InfoNegPago from './InfoNegPago';
import classes from './RegistroNegocio.module.css';

const RegistroNegocio = props => {

    let stage = <RegBienvenida />;
    if (props.personalInfo) {
        stage = <PersonalInfo />
    } else if (props.negocioInfo) {
        stage = <NegocioInfo />
    } else if (props.negocioFinal) {
        stage = <InfoNegPago />
    } 

    return (
        <div className={classes.registro} >
            <div className={classes.background}></div>
            {stage}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        // wellcome: state.registro.wellcome,
        personalInfo: state.registro.personalInfo,
        negocioInfo: state.registro.negocioInfo,
        negocioFinal: state.registro.negocioFinal,
    }
}

export default connect(mapStateToProps)(RegistroNegocio);