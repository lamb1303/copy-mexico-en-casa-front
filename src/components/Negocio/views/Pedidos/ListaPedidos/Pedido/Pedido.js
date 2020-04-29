import React from 'react'
import classes from './Pedido.module.css'

const Pedido = props => {
    return (
        <div className={classes.pedidoContainer} >
            <div>{props.clientName}</div>
            {props.orders.map(order => {
                return (
                    <div key={order.name} className={classes.pedidoDesc} >
                        <div>{order.amount}</div>
                        <div>{order.name}</div>
                        <div>check</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Pedido