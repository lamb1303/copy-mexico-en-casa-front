import React from 'react';
import classes from './Negocio.module.scss';
import Button from '../../UI/Button/Button';
import Products from './Products/Products';
import { connect } from 'react-redux';

const Negocio = props => {

    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';

    return (
        <div className={classes.negocio} >
            <img className={classes.negocio_imagen} src={imageUrl} alt='Foto del negocio' />
            <div className={classes.amount} >${props.orderPrice}</div>
            <Products />
            <Button btnType='Success' >Ver pedido</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orderPrice: state.cliente.orderPrice
    }
}

export default connect(mapStateToProps)(Negocio);