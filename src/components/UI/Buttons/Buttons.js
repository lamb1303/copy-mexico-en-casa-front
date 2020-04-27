import React from 'react';
import Button from '../Button/Button';
import * as actions from '../../../store/actions';
import classes from './Buttons.module.css';
import { connect } from 'react-redux';

const ClientButtons = props => {

    const editMode = () => {
        props.editMode();
        props.closeSidebar();
    }

    return (
        <div className={classes.Buttons}>
            <Button btnType='Success'  >Ver Pedidos</Button>
            <Button btnType='Success' clicked={() => editMode()} >Editar Perfil</Button>
            <Button btnType='Success' >Ayuda</Button>
            <Button btnType='Success' >Salir</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editMode: () => dispatch(actions.changeEditMode()),
        closeSidebar: () => dispatch(actions.burguerHandler())
    }
}


export default connect(null, mapDispatchToProps)(ClientButtons);