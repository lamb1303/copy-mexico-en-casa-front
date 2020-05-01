import React, { Fragment } from 'react';
import Pedido from './Pedido/Pedido';
import classes from './ListaPedidos.module.scss';
import { connect } from 'react-redux';

const ListaPedidos = props => {

    let pedidos = (
        <Fragment>
            {Object.keys(props.receivedOrders).map(clientId => {
                return <Pedido
                    key={clientId}
                    clientId={clientId}
                    clientName={props.receivedOrders[clientId].name}
                    orderList={props.receivedOrders[clientId].products}
                    check={props.receivedOrders[clientId].checked}
                />
            })}
        </Fragment>
    )

    if (props.preparing) {
        pedidos = (
            <Fragment>
                {Object.keys(props.prepareOrders).map(clientId => {
                    return <Pedido
                        key={clientId}
                        clientId={clientId}
                        clientName={props.prepareOrders[clientId].name}
                        orderList={props.prepareOrders[clientId].products}
                        check={props.prepareOrders[clientId].checked}
                    />
                })}
            </Fragment>
        )
    }

    if (props.ready) {
        pedidos = (
            <Fragment>
                {Object.keys(props.readyOrders).map(clientId => {
                    return <Pedido
                        key={clientId}
                        clientId={clientId}
                        clientName={props.readyOrders[clientId].name}
                        orderList={props.readyOrders[clientId].products}
                        check={props.readyOrders[clientId].checked}
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
        preparing: state.negocio.preparing,
        ready: state.negocio.ready,
        receivedOrders: state.negocio.receivedOrders,
        prepareOrders: state.negocio.prepareOrders,
        readyOrders: state.negocio.readyOrders
    }
}

export default connect(mapStateToProps)(ListaPedidos);