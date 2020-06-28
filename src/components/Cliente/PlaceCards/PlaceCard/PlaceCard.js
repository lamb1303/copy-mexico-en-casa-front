import React, { Component } from 'react';
import classes from './PlaceCard.module.css';
import Options from '../../../UI/PurchaseOptions/Options';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as EmptyStar } from '../../assets/emptyStar.svg';

const PlaceCard = (props) => {
    const isToGo = props.isToGo
    const isToTake = props.isToTake
    const cash = props.cash
    const creditCard = props.creditCard
    const rate = props.rate
    const imageUrl = props.photoBusiness
    const distance = props.distance
    const horaAbierto = props.horaAbierto
    const horaCerrado = props.horaCerrado



    var tmpStar = [];
    for (var i = 0; i < rate; i++) {
        tmpStar.push(i);
    }
    var stars = tmpStar.map(() => {
        return (
            <Star
                key={Math.random()} />
        );
    });

    return (
        <div className={classes.PlaceCard}>
            <img className={classes.PlaceCard_image} src={imageUrl} alt='Imagen Negocio' />
            <div className={classes.PlaceCard_details}>
                <div className={classes.PlaceCard_details_place} >
                    <span className={classes.title} >{props.name.toUpperCase()}</span>
                    <p className={classes.description} >{props.desc}</p>
                    <div className={classes.stars} >{stars} </div>
                    <span >A: {distance.toFixed(0)} mts.</span>
                    <span>
                        Horario: {horaAbierto} - {horaCerrado} hrs.
                        </span>
                    
                </div>
                <Options envio={isToGo, isToTake} cash={cash} creditCard={creditCard}/>
            </div>

        </div >
    )
    
}

export default PlaceCard;