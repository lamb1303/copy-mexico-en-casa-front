import React from 'react'
import classes from './Pedido.module.css'
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';
import Options from '../../../../../UI/PurchaseOptions/Options';
const Pedido = props => {

    const check = (checked) => {
        if (props.ready) {
            return;
        }
        if (props.orders) {
            props.checkReceivedOrder(!checked, props.clientId);
        } else {
            props.checkPreparedOrder(!checked, props.clientId);
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

    let checked = '';
    if (props.checked) checked = 'checked'

    return (
        <div className={[classes.pedidoContainer, classes[checked]].join(' ')} onClick={() => check(props.checked)} >
            <div className={classes.pedidoDetails} >
                <div className={classes.clientName} >{props.clientName}</div>
                {list}
            </div>
            <div className={classes.options} >
                <Options envio={props.envio} pago={props.pago} />
            </div>
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