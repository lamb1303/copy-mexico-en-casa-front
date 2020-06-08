import React, { Fragment, Component } from 'react';
import classes from './PlaceCard.module.css';
import Options from '../../../UI/PurchaseOptions/Options';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as EmptyStar } from '../../assets/emptyStar.svg';
import * as actions from '../../../../store/actions'
import { connect } from 'react-redux';


class PlaceCard extends Component {
 
    render() {
        const isToGo = this.props.isToGo
        const cash = this.props.cash
        const rate = this.props.rate
        const imageUrl = this.props.photoBusiness


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
                        <span className={classes.title} >{this.props.name.toUpperCase()}</span>
                        <p className={classes.description} >{this.props.desc}</p>
                        <div className={classes.stars} >{stars} </div>
                    </div>
                    <Options envio={isToGo} pago={cash} />
                </div>

            </div >
        )
    }
}




export default (PlaceCard);