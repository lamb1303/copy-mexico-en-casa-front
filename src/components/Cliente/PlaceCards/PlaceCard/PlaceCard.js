import React from 'react';
import classes from './PlaceCard.module.css';
import Options from '../../../UI/PurchaseOptions/Options';

const PlaceCard = (props) => {
    const isToGo = props.isToGo
    const cash = props.cash
    const creditCard = props.creditCard
    let imageUrl = props.photoBusiness
    const distance = props.distance
    const horaAbierto = props.horaAbierto
    const horaCerrado = props.horaCerrado

    if(imageUrl === 'empty') imageUrl = 'https://firebasestorage.googleapis.com/v0/b/catalogocovid2020.appspot.com/o/imagen_mexico_en_casa.png?alt=media&token=39bc7063-cb25-4be4-85e3-a6a24c55b7bd';

    return (
        <div className={classes.PlaceCard}>
            <img className={classes.PlaceCard_image} src={imageUrl} alt='Imagen Negocio' />
            <div className={classes.PlaceCard_details}>
                <div className={classes.PlaceCard_details_place} >
                    <span className={classes.title} >{props.name.toUpperCase()}</span>
                    <p className={classes.description} >{props.desc}</p>
                    <span className={classes.span}>
                        Horario: {horaAbierto} - {horaCerrado} hrs.
                    </span>
                    <span className={classes.span}>Distancia: {distance.toFixed(0)} km.</span>
                    
                </div>
                <Options isToGo={isToGo} cash={cash} creditCard={creditCard}/>
            </div>

        </div >
    )
    
}

export default PlaceCard;