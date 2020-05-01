import React, { useState, useEffect } from 'react'
import classes from './Pedido.module.css'
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';

const Pedido = props => {

    const check = (checked, prodId) => {
        if (props.orders) {
            props.checkReceivedOrder(checked, prodId, props.clientId);
        } else {
            props.checkPreparedOrder(checked, prodId, props.clientId);
        }
    }

    const list = Object.keys(props.orderList).map(prodId => {
        return (
            <div key={prodId} className={classes.pedidoDesc} >
                <div>{props.orderList[prodId].amount}</div>
                <div>{props.orderList[prodId].name}</div>
                {props.ready ? <div></div> : <Checkbox
                    checked={props.orderList[prodId].checked}
                    onChange={(event) => check(event.target.checked, prodId)}
                />}
            </div>
        )
    })


    return (
        <div className={classes.pedidoContainer} >
            <div>{props.clientName}</div>
            {list}
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
        checkPreparedOrder: (checked, prodId, clientId) => dispatch(actions.checkPreparingOrder(checked, prodId, clientId)),
        checkReceivedOrder: (checked, prodId, clientId) => dispatch(actions.checkReceivedOrder(checked, prodId, clientId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);