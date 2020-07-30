import React, { useMemo, useEffect, useCallback } from 'react';
import classes from './Pedidos.module.css';
import BotonesPedidos from './BotonesPedidos/BotonesPedido';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../../store/actions';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import Comments from './Comments/Comments';
import openSocket from 'socket.io-client';

import Alert from '../../../UI/Alert/Alert';

const Pedidos = props => {

    const { getPedidos, getPreparing, getReady, idBusiness } = props;

    useMemo(() => {
        getPedidos(idBusiness);
        getPreparing(idBusiness);
        getReady(idBusiness);
    }, [getPedidos, getPreparing, getReady, idBusiness]);

    useEffect(useCallback(() => {
        const socket = openSocket(process.env.REACT_APP_SOCKET);

        socket.on('notify-business', businessId => {
            if (businessId === idBusiness) getPedidos(idBusiness);
        })

        return () => socket.disconnect();

    }, [idBusiness, getPedidos]), [getPedidos, getPedidos])

    let buttonMessage = 'Empezar';
    if (props.preparing) {
        buttonMessage = 'Terminar'
    }
    if (props.ready) {
        buttonMessage = 'Entregado'
    }

    const handleButtonAction = () => {
        if (props.orders) {
            if (Object.keys(props.checkedOrders).length !== 0) {
                props.empezar(props.checkedOrders)
            }
        } else if (props.preparing) {
            if (Object.keys(props.checkedPrepare).length !== 0) {
                props.terminar(props.checkedPrepare)
            }
        } else if (props.ready) {
            if (Object.keys(props.checkedDeliver).length !== 0) {
                props.entregar(props.checkedDeliver)
            }
        }
    }

    return (
        <div className={classes.pedidos} >
            {props.loading && (
                <>
                    <Backdrop show={props.loading} />
                    <Spinner className={classes.spinner} />
                </>
            )}
            <BotonesPedidos />
            <ListaPedidos />
            <Button
                clicked={() => handleButtonAction()}
                disabled={(Object.keys(props.checkedOrders).length === 0 && buttonMessage === 'Empezar') ||
                    (Object.keys(props.checkedPrepare).length === 0 && buttonMessage === 'Terminar') ||
                    (Object.keys(props.checkedDeliver).length === 0 && buttonMessage === 'Entregado')
                    ? true : false}
                btnType={
                    (Object.keys(props.checkedOrders).length === 0 && buttonMessage === 'Empezar') ||
                        (Object.keys(props.checkedPrepare).length === 0 && buttonMessage === 'Terminar') ||
                        (Object.keys(props.checkedDeliver).length === 0 && buttonMessage === 'Entregado')
                        ? 'Danger' : 'Success'} >
                {buttonMessage}
            </Button>
            {props.viewCommentsModal && <Comments />}
            {props.isAlert &&
                <Alert title={props.alertType}
                    isActive={props.isAlert}
                    closeAlert={() => props.closeAlert()}>
                    {props.message}
                </Alert>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        idBusiness: state.home.id,
        orders: state.orders.orders,
        preparing: state.orders.preparing,
        ready: state.orders.ready,
        checkedOrders: state.orders.checkedOrders,
        checkedPrepare: state.orders.checkedPrepare,
        checkedDeliver: state.orders.checkedDeliver,
        loading: state.negocio.loading,
        error: state.negocio.loading,
        viewCommentsModal: state.orders.viewCommentsModal,
        isAlert: state.orders.isAlert,
        alertType: state.orders.alertType,
        message: state.orders.message,


    }
}

const mapDispatchToProps = {
    empezar: actions.empezarPedido,
    terminar: actions.terminarPedido,
    entregar: actions.entregarPedido,
    getPedidos: actions.getPedidoNegocioId,
    getPreparing: actions.getPedidoPreparing,
    getReady: actions.getPedidoReady,
    closeAlert: actions.closeAlert,
}


export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);