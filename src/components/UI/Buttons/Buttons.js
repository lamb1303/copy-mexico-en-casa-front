import React, { useState } from 'react';
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

    const [showPermissionButton, setShowPermissionButton] = useState(Notification.permission === 'granted');

    const requestPermission = () => {
        Notification.requestPermission(result => {
            if (result !== 'granted') {
                window.alert('No permission granted');
            } else {
                if ('serviceWorker' in navigator) {

                    const options = {
                        body: 'Mi Notificaacion!'
                    };
                    navigator.serviceWorker.ready
                        .then(swreg => {
                            swreg.showNotification('Gracias!', options);
                            setShowPermissionButton(true);
                        })
                } else {
                    window.alert('serviceWorker not in navigator');
                }
            }
        })
    }

    // const notifyIsGranted = Notification.permission === 'granted';

    return (
        <div className={classes.Buttons}>
            {<NavLink to='/pedidos'>
                <Button btnType='Success' clicked={() => props.closeSidebar()} >
                    Ver Pedidos
            </Button>
            </NavLink>}

            <NavLink to={props.isClient ? '/editClient' : '/negocio'}>
                <Button btnType='Success' clicked={() => editMode()} >
                    Editar Perfil
                </Button>
            </NavLink>
            {/* <Button btnType='Success' >Ayuda</Button> */}
            <NavLink to='/Home' >
                <Button btnType='Success' clicked={() => props.logOut()} >
                    Salir
                </Button>
            </NavLink>
            {!showPermissionButton && <Button clicked={() => requestPermission()} disabled={showPermissionButton} >
            {/* {!notifyIsGranted && <Button clicked={() => requestPermission()} disabled={notifyIsGranted} > */}
                Enviame notificaciones
            </Button>}
            <a href='http://fb.me/RussApp2020'>
                <span>Created by <b>RUSSAPP</b></span>
            </a>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isClient: state.home.isCustomer,
    }
}

const mapDispatchToProps = {
    editMode: actions.changeEditMode,
    closeSidebar: actions.burguerHandler,
    logOut: actions.logOut,


}

export default connect(mapStateToProps, mapDispatchToProps)(ClientButtons);