import React from 'react';
import Card from '../../UI/Card/Card';
import TextField from '@material-ui/core/TextField';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';

import classes from './PersonalInfo.module.css';
import { connect } from 'react-redux';



const PersonalInfo = props => {

    const form = (
        <>
            <TextField
                label="Ingresa tu Nombre"
                type="text"
                margin="normal"
                required
            />
            <TextField
                label="Ingresa tus Apellidos"
                type="text"
                margin="normal"
            />
            <TextField
                label="Ingresa tu Email"
                type="email"
                margin="normal"
            />
            <TextField
                label="Ingresa una Contraseña"
                type="password"
                margin="normal"
            />
            <TextField
                label="Confirmar Contraseña"
                type="password"
                margin="normal"
            />
            <TextField
                label="Ingresa tu Telefono"
                type="number"
                margin="normal"
            />
        </>
    )

    return <div className={classes.personalInfo} >
        <div className={classes.header} >
            <span>Datos Personales. Por favor llene los datos de la persona responsable del negocio.</span>
        </div>
        <div className={classes.card} >
            <Card >
                <div className={classes.data} >
                    {form}
                </div>
            </Card>
        </div>
        <div className={classes.buttons} >
            <Button btnType='Success' clicked={() => props.goToInfoNegocio()} >
                CONTINUAR
            </Button>
            <Button btnType='Danger' clicked={() => props.goToWelcome()} >
                CANCELAR
            </Button>
        </div>
    </div>
};

const mapDispatchToProps = dispatch => {
    return {
        goToInfoNegocio: () => dispatch(actions.goToInfoNegocio()),
        goToWelcome: () => dispatch(actions.goToWelcome())
    }
}

export default connect(null, mapDispatchToProps)(PersonalInfo);