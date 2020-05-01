import React, { useState, useEffect } from 'react'
import classes from './Pedido.module.css'
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';

const Pedido = props => {

    const check = (checked, prodId) => {
        if (props.orders) {
            props.checkReceivedOrder(checked, props.clientId);
        } else {
            props.checkPreparedOrder(checked, props.clientId);
        }
    }


    const list = Object.keys(props.orderList).map(prodId => {
        return (
            <div key={prodId} className={classes.pedidoDesc} >
                <div>{props.orderList[prodId].amount}</div>
                <div>{props.orderList[prodId].name}</div>
            </div>
        )
    })


    return (
        <div className={classes.pedidoContainer} >
            <div className={classes.pedidoDetails} >
                <div className={classes.clientName} >{props.clientName}</div>
                {list}
            </div>
            {props.ready ? <div></div> : <Checkbox
                checked={props.check}
                onChange={(event) => check(event.target.checked)}
            />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.negocio.orders,
        ready: state.negocio.ready
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkPreparedOrder: (checked, clientId) => dispatch(actions.checkPreparingOrder(checked, clientId)),
        checkReceivedOrder: (checked, clientId) => dispatch(actions.checkReceivedOrder(checked, clientId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);