import React from 'react';
import Button from '../Button/Button';
import * as actions from '../../../store/actions';
import classes from './Buttons.module.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ClientButtons = props => {

    const editMode = () => {
        if (!props.isClient) props.editMode();
        props.closeSidebar();
    }

    return (
        <div className={classes.Buttons}>
            <Button btnType='Success' clicked={() => props.closeSidebar()} >
                {props.isClient ? <NavLink to='/client'>Ver Pedidos</NavLink> :
                    <NavLink to='/pedidos'>Ver Pedidos</NavLink>}
            </Button>
            <Button btnType='Success' clicked={() => editMode()} >
                {props.isClient ? <NavLink to='/editClient' >Editar Perfil</NavLink> :
                    <NavLink to='/negocio'>Editar Perfil</NavLink>}
            </Button>
            <Button btnType='Success' >Ayuda</Button>
            <Button btnType='Success' clicked={() => props.logOut()} >
                <NavLink to='/Home' >Salir</NavLink>
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isClient: state.home.isCustomer
    }
}

const mapDispatchToProps = {

    editMode: actions.changeEditMode,
    closeSidebar: actions.burguerHandler,
    logOut: actions.logOut,

}

export default connect(mapStateToProps, mapDispatchToProps)(ClientButtons);