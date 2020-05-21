import React from 'react';
import Card from '../../UI/Card/Card';
import TextField from '@material-ui/core/TextField';
import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';
import classes from './NegocioInfo.module.css';
import { connect } from 'react-redux';

const NegocioInfo = props => {
    return <div className={classes.NegocioInfo}>
        <div className={classes.header} >
            <span>Datos del Negocio. Por favor llene los datos del negocio</span>
        </div>
        <div className={classes.card} >
            <Card>
                <div className={classes.form} >
                    <TextField
                        className={classes.input}
                        label="Nombre del negocio"
                        type="text"
                        required
                    />
                    <TextField
                        className={classes.input}
                        label="Direccion del negocio"
                        type="text"
                        required
                    />
                    <TextField
                        className={classes.input}
                        label="Descripcion del negocio"
                        required
                        multiline
                        rows={3}
                    />
                    <Table />
                </div>
            </Card>
        </div>
        <div className={classes.buttons} >
            <Button btnType='Success' clicked={() => props.goToNegPago()} >
                CONTINUAR
            </Button>
            <Button btnType='Danger' clicked={() => props.goToPersonal()} >
                CANCELAR
            </Button>
        </div>
    </div>
};

const mapDispatchToProps = dispatch => {
    return {
        goToPersonal: () => dispatch(actions.goToPersonal()),
        goToNegPago: () => dispatch(actions.goToNegPago())
    }
}

export default connect(null, mapDispatchToProps)(NegocioInfo);