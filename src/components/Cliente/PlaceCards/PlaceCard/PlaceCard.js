import React, { Fragment } from 'react';
import classes from './PlaceCard.module.css';

import Options from '../../../UI/PurchaseOptions/Options';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as EmptyStar } from '../../assets/emptyStar.svg';

const PlaceCard = () => {

    const imageUrl = 'https://c8.alamy.com/compes/t20754/la-ilustracion-muestra-una-casa-pequena-hecho-en-un-estilo-de-dibujos-animados-aislado-sobre-fondo-blanco-t20754.jpg';
    const stars = (
        <Fragment>
            <Star />
            <Star />
            <Star />
            <EmptyStar />
            <EmptyStar />
        </Fragment>
    )
    return (
        <div className={classes.PlaceCard}>
            <img className={classes.PlaceCard_image} src={imageUrl} alt='Imagen Negocio' />
            <div className={classes.PlaceCard_details}>
                <div className={classes.PlaceCard_details_place} >
                    <span className={classes.title} >Gorditas doña tencha</span>
                    <p className={classes.description} >Gorditas de chicharron, de mole y frijol hechas a manuela </p>
                    <div className={classes.stars} >{stars} </div>
                </div>
                <Options />
            </div>
        </div >
    )
}

export default PlaceCard;