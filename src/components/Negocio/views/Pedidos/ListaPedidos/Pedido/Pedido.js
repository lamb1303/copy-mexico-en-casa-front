import React from 'react'
import classes from './Pedido.module.css'
// import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';
import Options from '../../../../../UI/PurchaseOptions/Options';
import Button from '../../../../../UI/Button/Button';

const Pedido = props => {

    const { orderList } = props

    const check = (checked) => {
        if (props.orders) {
            props.checkReceivedOrder(!checked, props.idOrder);
        } else if (props.ready) {
            props.checkDelivering(!checked, props.idOrder);
        } else {
            props.checkPreparedOrder(!checked, props.idOrder);
        }
    }

    const handleSelectedOrder = () => {
        const selectedOrder = {
            idCustomer: props.idCustomer,
            location: props.location,
            orderList: props.orderList,
            isToTake: props.isToTake,
            total: props.total,
        }
        props.openViewComments(selectedOrder);
    }

    // const hasComments = Object.keys(orderList).filter(prodId => orderList[prodId].comment
    //     && orderList[prodId].comment !== '');

    const list = Object.keys(orderList).map(prodId => {
        return (
            <div key={prodId} className={classes.pedidoDesc} >
                <h4>{orderList[prodId].amount}</h4>
                <p>{orderList[prodId].name}</p>
            </div>
        )
    })

    let checked = '';
    if (props.checked) checked = 'checked'

    return (
        <>

            <div className={[classes.pedidoContainer, classes[checked]].join(' ')}>
                <div className={classes.detailsContainer} onClick={() => check(props.checked)}>
                    <div className={classes.pedidoDetails} >
                        {list}
                    </div>
                    <div className={classes.options} >
                        <Options envio={props.isToTake} pago={props.isCash} />
                    </div>
                </div>
                <div className={classes.viewComments}>
                    <Button
                        btnType='Success'
                        disabled={false}
                        clicked={() => handleSelectedOrder()}
                    >
                        Ver Comentarios
                    </Button>
                </div>
                <div className={classes.orderDate} onClick={() => check(props.checked)}>{new Date(props.orderDate).toLocaleTimeString('en-US', { hour12: false })}</div>

            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        ready: state.orders.ready,
    }
}

const mapDispatchToProps = {
    checkPreparedOrder: actions.checkPreparingOrder,
    checkReceivedOrder: actions.checkReceivedOrder,
    checkDelivering: actions.checkDeliveringOrder,
    openViewComments: actions.openViewComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);