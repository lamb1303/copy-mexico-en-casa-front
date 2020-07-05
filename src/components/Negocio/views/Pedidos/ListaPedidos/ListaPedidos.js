import React, { Fragment } from 'react';
import Pedido from './Pedido/Pedido';
import classes from './ListaPedidos.module.scss';
import { connect } from 'react-redux';

const ListaPedidos = props => {

    let pedidos = (
        <Fragment>
            {Object.keys(props.receivedOrders).sort().map(idOrder => {
                return <Pedido
                    key={idOrder}
                    idOrder={idOrder}
                    idCustomer={props.receivedOrders[idOrder].idCustomer}
                    orderList={props.receivedOrders[idOrder].dishes}
                    isToTake={props.receivedOrders[idOrder].isToTake}
                    isCash={props.receivedOrders[idOrder].isCash}
                    checked={props.receivedOrders[idOrder].checked}
                    orderDate={props.receivedOrders[idOrder].orderDate}
                    location={props.receivedOrders[idOrder].location}
                    total={props.receivedOrders[idOrder].total}


                />
            })}
        </Fragment>
    )

    if (props.preparing) {
        pedidos = (
            <Fragment>
                {Object.keys(props.prepareOrders).sort().map(idOrder => {
                    return <Pedido
                        key={idOrder}
                        idOrder={idOrder}
                        idCustomer={props.prepareOrders[idOrder].idCustomer}
                        orderList={props.prepareOrders[idOrder].dishes}
                        isToTake={props.prepareOrders[idOrder].isToTake}
                        isCash={props.prepareOrders[idOrder].isCash}
                        checked={props.prepareOrders[idOrder].checked}
                        orderDate={props.prepareOrders[idOrder].orderDate}
                        location={props.prepareOrders[idOrder].location}
                        total={props.prepareOrders[idOrder].total}


                    />
                })}
            </Fragment>
        )
    }
    if (props.ready) {
        pedidos = (
            <Fragment>
                {Object.keys(props.readyOrders).sort().map(idOrder => {
                    return <Pedido
                        key={idOrder}
                        idOrder={idOrder}
                        idCustomer={props.readyOrders[idOrder].idCustomer}
                        orderList={props.readyOrders[idOrder].dishes}
                        check={props.readyOrders[idOrder].checked}
                        isToTake={props.readyOrders[idOrder].isToTake}
                        isCash={props.readyOrders[idOrder].isCash}
                        checked={props.readyOrders[idOrder].checked}
                        orderDate={props.readyOrders[idOrder].orderDate}
                        location={props.readyOrders[idOrder].location}
                        total={props.readyOrders[idOrder].total}

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
        preparing: state.orders.preparing,
        ready: state.orders.ready,
        receivedOrders: state.orders.receivedOrders,
        prepareOrders: state.orders.prepareOrders,
        readyOrders: state.orders.readyOrders
    }
}

export default connect(mapStateToProps)(ListaPedidos);