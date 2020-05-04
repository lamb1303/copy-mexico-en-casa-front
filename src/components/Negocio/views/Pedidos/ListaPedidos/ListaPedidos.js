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
                    envio={props.receivedOrders[clientId].metodoEntrega}
                    pago={props.receivedOrders[clientId].metodoPago}
                    checked={props.receivedOrders[clientId].checked}
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
                        envio={props.prepareOrders[clientId].metodoEntrega}
                        pago={props.prepareOrders[clientId].metodoPago}
                        checked={props.prepareOrders[clientId].checked}
                    />
                })}
            </Fragment>
        )
    }
    let pedidoReady = '';
    if (props.ready) {
        pedidoReady = 'readyList';
        pedidos = (
            <Fragment>
                {Object.keys(props.readyOrders).map(clientId => {
                    return <Pedido
                        key={clientId}
                        clientId={clientId}
                        clientName={props.readyOrders[clientId].name}
                        orderList={props.readyOrders[clientId].products}
                        check={props.readyOrders[clientId].checked}
                        envio={props.readyOrders[clientId].metodoEntrega}
                        pago={props.readyOrders[clientId].metodoPago}
                        checked={props.readyOrders[clientId].checked}
                    />
                })}
            </Fragment>
        )
    }

    if (props.entregado) {
        //change props.readyOrders por los que ya fueron entregados, (calificados)
        pedidos = (
            <Fragment>
                {Object.keys(props.readyOrders).map(clientId => {
                    return <Pedido
                        key={clientId}
                        clientId={clientId}
                        clientName={props.readyOrders[clientId].name}
                        orderList={props.readyOrders[clientId].products}
                        check={props.readyOrders[clientId].checked}
                        envio={props.readyOrders[clientId].metodoEntrega}
                        pago={props.readyOrders[clientId].metodoPago}
                        checked={props.readyOrders[clientId].checked}
                    />
                })}
            </Fragment>
        )
    }

    return (
        <div className={[classes.listaPedidos, classes[pedidoReady]].join(' ')} >
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