import React from 'react';
import Button from '../Button/Button';
import classes from './Buttons.module.css';

const ClientButtons = props => {

    return (
        <div className={classes.Buttons}>
            <Button btnType='Success' >Ver Pedidos</Button>
            <Button btnType='Success' >Editar Perfil</Button>
            <Button btnType='Success' >Ayuda</Button>
            <Button btnType='Success' >Salir</Button>
        </div>
    )
}

export default ClientButtons;