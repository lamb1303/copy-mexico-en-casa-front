import React from 'react';
import RegBienvenida from './RegBienvenida';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';
import classes from './RegistroNegocio.module.css';

const RegistroNegocio = props => {

    let stage = <RegBienvenida />;
    if (props.personalInfo) {
        stage = <PersonalInfo />
    } else if (props.negocioInfo) {
        stage = <div>negocioInfo</div>;
    } else if (props.negocioFinal) {
        stage = <div>negocioFinal</div>;
    } else if (props.avisoPriv) {
        stage = <div>avisoPriv</div>;
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
        avisoPriv: state.registro.avisoPriv,
    }
}

export default connect(mapStateToProps)(RegistroNegocio);