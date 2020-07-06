import React from 'react';
import classes from './PlaceCard.module.css';
import Options from '../../../UI/PurchaseOptions/Options';

const PlaceCard = (props) => {
    const isToGo = props.isToGo
    const cash = props.cash
    const creditCard = props.creditCard
    const imageUrl = props.photoBusiness
    const distance = props.distance
    const horaAbierto = props.horaAbierto
    const horaCerrado = props.horaCerrado

    return (
        <div className={classes.PlaceCard}>
            <img className={classes.PlaceCard_image} src={imageUrl} alt='Imagen Negocio' />
            <div className={classes.PlaceCard_details}>
                <div className={classes.PlaceCard_details_place} >
                    <span className={classes.title} >{props.name.toUpperCase()}</span>
                    <p className={classes.description} >{props.desc}</p>
                    <span >Distancia: {distance.toFixed(0)} km.</span>
                    <span>
                        Horario: {horaAbierto} - {horaCerrado} hrs.
                        </span>
                    
                </div>
                <Options isToGo={isToGo} cash={cash} creditCard={creditCard}/>
            </div>

        </div >
    )
    
}

export default PlaceCard;