import React from 'react';
import Button from '../Button/Button';
import * as actions from '../../../store/actions';
import classes from './Buttons.module.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ClientButtons = props => {

    const editMode = () => {
        props.editMode();
        props.closeSidebar();
    }

    return (
        <div className={classes.Buttons}>
            <Button btnType='Success' clicked={() => props.closeSidebar()} >
                {props.isClient ? <NavLink to='/client'>Ver Pedidos</NavLink> :
                    <NavLink to='/pedidos'>Ver Pedidos</NavLink>}
            </Button>
            <Button btnType='Success' clicked={() => editMode()} >
                {props.isClient ? <NavLink>Editar Perfil</NavLink> :
                    <NavLink to='/negocio'>Editar Perfil</NavLink>}
            </Button>
            <Button btnType='Success' >Ayuda</Button>
            <Button btnType='Success' >Salir</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isClient: state.cliente.cliente
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editMode: () => dispatch(actions.changeEditMode()),
        closeSidebar: () => dispatch(actions.burguerHandler())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientButtons);