import React, { Fragment } from 'react';
import classes from './Pedidos.module.css';
import BotonesPedidos from './BotonesPedidos/BotonesPedido';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../../store/actions';

const Pedidos = props => {

    let buttonMessage = 'Empezar';
    if (props.preparing) buttonMessage = 'Terminar'
    if (props.ready) buttonMessage = 'Terminado'

    const handleButtonAction = () => {
        if (props.orders) {
            props.empezar()
        } else if (props.preparing) {
            props.terminar()
        } else {
            //to define
        }
    }

    return (
        <div className={classes.pedidos} >
            <BotonesPedidos />
            <ListaPedidos />
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
        ready: state.negocio.ready
    }
}

const mapDispatchToProps = dispatch => {
    return {
        empezar: () => dispatch(actions.empezarPedido()),
        terminar: () => dispatch(actions.terminarPedido())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);