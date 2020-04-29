import React, { Fragment } from 'react';
import Pedido from './Pedido/Pedido';
import classes from './ListaPedidos.module.scss';
import { connect } from 'react-redux';

const ListaPedidos = props => {

    let pedidos = (
        <Fragment>
            {props.receivedOrders.map(ped => {
                return <Pedido
                    key={ped.mail}
                    clientName={ped.clientName}
                    orders={ped.products}
                />
            })}
        </Fragment>
    )

    if (props.preparing) {
        pedidos = (
            <Fragment>
                {props.prepareOrders.map(ped => {
                    return <Pedido
                        key={ped.mail}
                        clientName={ped.clientName}
                        orders={ped.products}
                    />
                })}
            </Fragment>
        )
    }

    if (props.ready) {
        pedidos = (
            <Fragment>
                {props.readyOrders.map(ped => {
                    return <Pedido
                        key={ped.mail}
                        clientName={ped.clientName}
                        orders={ped.products}
                    />
                })}
            </Fragment>
        )
    }


    return (
        <div className={classes.listaPedidos} >
            {pedidos}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.negocio.orders,
        preparing: state.negocio.preparing,
        ready: state.negocio.ready,
        receivedOrders: state.negocio.receivedOrders,
        prepareOrders: state.negocio.prepareOrders,
        readyOrders: state.negocio.readyOrders
    }
}

export default connect(mapStateToProps)(ListaPedidos);