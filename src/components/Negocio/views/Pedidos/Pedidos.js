import React, { Fragment } from 'react';
import classes from './Pedidos.module.css';
import BotonesPedidos from './BotonesPedidos/BotonesPedido';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';

const Pedidos = props => {

    let buttonMessage = 'Empezar';
    if (props.preparing) buttonMessage = 'Terminar'
    if (props.ready) buttonMessage = 'Terminado'

    return (
        <div className={classes.pedidos} >
            <BotonesPedidos />
            <ListaPedidos />
            <Button btnType='Danger'  >{buttonMessage}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.negocio.orders,
        preparing: state.negocio.preparing,
        ready: state.negocio.ready
    }
}




export default connect(mapStateToProps)(Pedidos);