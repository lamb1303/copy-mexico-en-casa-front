import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './OrdersHistory.scss'

const OrderHistory = (props) => {

    const { clientGetOrders, idCustomer } = props

    useEffect(() => {
        clientGetOrders(idCustomer)
    }, [clientGetOrders]);

    const orders = props.orders.map(res => {
        console.log(res)
        return (res.dishes.map(dish => (
            <div className="showCard" key={res.orderId + Math.random()}>
                <h4>{dish.name}: {dish.amount}</h4>
                <img className="product_image "src={dish.img}></img>
            </div>
        )))
    })
    return (
        <div className="orderContainer">
            {orders}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        orders: state.cliente.orders,
        idCustomer: state.home.id
    }
}

const mapDispatchToProps = {
    clientGetOrders: actions.clientGetOrders
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);