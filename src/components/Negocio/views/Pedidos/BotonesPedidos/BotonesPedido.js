import React from 'react';
import Button from '../../../../UI/Button/Button';
import * as actions from '../../../../../store/actions';
import classes from './BotonesPedido.module.scss';
import { connect } from 'react-redux';

const BotonesPedidos = props => {

    const handleView = (from) => {
        switch (from) {
            case 'orders': return props.onOrdenes()
            case 'prepare': return props.onPrepare()
            case 'ready': return props.onReady()
            default: return
        }
    }

    return (
        <div className={classes.buttons}>
            <Button
                clicked={() => handleView('orders')}
                btnType={props.orders ? 'Success' : 'Danger'}
                className={classes.btn} >Ordenes</Button>
            <Button
                clicked={() => handleView('prepare')}
                btnType={props.preparing ? 'Success' : 'Danger'}
                className={classes.btn} >Preparando</Button>
            <Button
                clicked={() => handleView('ready')}
                btnType={props.ready ? 'Success' : 'Danger'}
                className={classes.btn} >Orden Lista</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        preparing: state.orders.preparing,
        ready: state.orders.ready
    }
}

const mapDispatchToProps =  {
        onOrdenes: actions.ordersButtonSelected,
        onPrepare: actions.prepareButtonSelected,
        onReady: actions.readyButtonSelected,
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BotonesPedidos);