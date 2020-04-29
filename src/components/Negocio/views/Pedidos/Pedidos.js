import React, { Fragment } from 'react';
import classes from './Pedidos.module.css';
import BotonesPedidos from './BotonesPedidos/BotonesPedido';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import { connect } from 'react-redux';

const Pedidos = props => {


    return (
        <div className={classes.pedidos} >
            <BotonesPedidos />
            <ListaPedidos />
            <button />
        </div>
    )
}






export default Pedidos;