import React, { Fragment } from 'react';
import Pedido from './Pedido/Pedido';
import classes from './ListaPedidos.module.scss';
import { connect } from 'react-redux';


const compare = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    const orderDateA = `${dateA.getHours()}${dateA.getMinutes()}${dateA.getSeconds()}`;
    const orderDateB = `${dateB.getHours()}${dateB.getMinutes()}${dateB.getSeconds()}`;

    return parseInt(orderDateA) > parseInt(orderDateB) ? 1 : -1;
}
const ListaPedidos = props => {

    let pedidos = (
        <Fragment>
            {Object.keys(props.receivedOrders).sort((a, b) =>
                compare(props.receivedOrders[a].orderDate,
                    props.receivedOrders[b].orderDate)
            ).map(idOrder => {
                return <Pedido
                    key={idOrder}
                    idOrder={idOrder}
                    idCustomer={props.receivedOrders[idOrder].idCustomer}
                    orderList={props.receivedOrders[idOrder].dishes}
                    isToTake={props.receivedOrders[idOrder].isToTake}
                    isCash={props.receivedOrders[idOrder].isCash}
                    checked={props.receivedOrders[idOrder].checked}
                    orderDate={props.receivedOrders[idOrder].orderDate}
                    location={props.receivedOrders[idOrder].geolocation}
                    total={props.receivedOrders[idOrder].total}
                    reference={props.receivedOrders[idOrder].reference}


                />
            })}
        </Fragment>
    )

    if (props.preparing) {
        pedidos = (
            <Fragment>
                {Object.keys(props.prepareOrders).sort((a, b) =>
                    compare(props.prepareOrders[a].orderDate,
                        props.prepareOrders[b].orderDate))
                    .map(idOrder => {
                        return <Pedido
                            key={idOrder}
                            idOrder={idOrder}
                            idCustomer={props.prepareOrders[idOrder].idCustomer}
                            orderList={props.prepareOrders[idOrder].dishes}
                            isToTake={props.prepareOrders[idOrder].isToTake}
                            isCash={props.prepareOrders[idOrder].isCash}
                            checked={props.prepareOrders[idOrder].checked}
                            orderDate={props.prepareOrders[idOrder].orderDate}
                            location={props.prepareOrders[idOrder].geolocation}
                            total={props.prepareOrders[idOrder].total}


                        />
                    })}
            </Fragment>
        )
    }
    if (props.ready) {
        pedidos = (
            <Fragment>
                {Object.keys(props.readyOrders).sort((a, b) =>
                    compare(props.readyOrders[a].orderDate,
                        props.readyOrders[b].orderDate))
                    .map(idOrder => {
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
                            location={props.readyOrders[idOrder].geolocation}
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