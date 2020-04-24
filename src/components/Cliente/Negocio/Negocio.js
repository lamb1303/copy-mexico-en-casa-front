import React from 'react';
import classes from './Negocio.module.scss';

const Negocio = () => {

    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';

    return (
        <div className={classes.negocio} >
            <img className={classes.negocio_imagen} src={imageUrl} alt='Foto del negocio' />
            <div className={classes.amount} >$0.0</div>
            <div>Lista de productos</div>
            <div>Botton ver pedido</div>
        </div>
    )
}

export default Negocio;