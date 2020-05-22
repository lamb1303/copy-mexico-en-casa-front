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

    const logOut = () => {
        const userData = {
            token: null,
            isCustomer: null,
        };
        localStorage.removeItem('user');
        props.setLocalTokenStored(userData);
        editMode();
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
            <Button btnType='Success' clicked={() => logOut()} >
                <NavLink to='/Home' >Salir</NavLink>
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isClient: state.cliente.cliente
    }
}

const mapDispatchToProps = {

    editMode: actions.changeEditMode,
    closeSidebar: actions.burguerHandler,
    setLocalTokenStored: actions.setLocalTokenStored

}

export default connect(mapStateToProps, mapDispatchToProps)(ClientButtons);