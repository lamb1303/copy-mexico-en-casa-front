import React from 'react';
import classes from './PlaceCard.module.css';

const PlaceCard = () => {

    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';

    return (
        <div className={classes.PlaceCard}>
            <img className={classes.PlaceCard_image} src={imageUrl} alt='Imagen Negocio' />
            <div className={classes.PlaceCard_details}>
                <div className={classes.PlaceCard_details_place} >
                    <span style={{ fontSize: '0.7rem' }} >Gorditas doña tencha</span>
                    <p style={{ fontSize: '0.7rem' }} >Gorditas de chicharron, de mole y frijol hechas a manuela</p>
                </div>
                <div>domicilio, enlocal, tarjeta, efectivo</div>
            </div>
        </div >
    )
}

export default PlaceCard;