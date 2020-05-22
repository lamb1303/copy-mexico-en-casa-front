// import React, { useEffect, useMemo } from 'react';
import React from 'react';
import classes from './Pedidos.module.css';
import BotonesPedidos from './BotonesPedidos/BotonesPedido';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../../store/actions';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
// import Alert from '../../../UI/Alert/Alert';

const Pedidos = props => {

    // const { getPedidos, getPreparing, getReady } = props;

    // useMemo(() => {
    //     getPedidos();
    //     getPreparing();
    //     getReady();
    // }, [getPedidos, getPreparing, getReady]);

    let buttonMessage = 'Empezar';
    if (props.preparing) {
        buttonMessage = 'Terminar'
    }
    if (props.ready) {
        buttonMessage = 'Terminado'
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
        } else {
            //to define
        }
    }

    // let errorMessage;
    // if (!props.loading && props.error) {
    //     errorMessage = 'Algo salio mal, por favor intentalo de nuevo';
    // }

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
            {props.ready && (
                <div className={classes.entregado} >
                    <span>Entregado</span>
                    <ListaPedidos entregado />
                </div>
            )}
            {!props.ready && <Button
                clicked={() => handleButtonAction()}
                btnType='Danger'  >{buttonMessage}</Button>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.negocio.orders,
        preparing: state.negocio.preparing,
        ready: state.negocio.ready,
        checkedOrders: state.negocio.checkedOrders,
        checkedPrepare: state.negocio.checkedPrepare,
        loading: state.negocio.loading,
        error: state.negocio.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        empezar: (checkedOrders) => dispatch(actions.empezarPedido(checkedOrders)),
        terminar: (checkedPrepare) => dispatch(actions.terminarPedido(checkedPrepare)),
        getPedidos: () => dispatch(actions.getPedidoNegocioId(2)),
        getPreparing: () => dispatch(actions.getPedidoPreparing(2)),
        getReady: () => dispatch(actions.getPedidoReady(2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);