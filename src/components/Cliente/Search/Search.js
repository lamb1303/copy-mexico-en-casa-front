import React, { useState, Fragment } from 'react';
import { ReactComponent as Lupa } from './lupa.svg';
import classes from './Search.module.css';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PlaceCard from '../PlaceCards/PlaceCard/PlaceCard';
import * as action from '../../../store/actions'
import { NavLink } from 'react-router-dom';
const Search = (props) => {

    const [businessDesc, typeBusiness] = useState("");

    const selectedBusiness = (business) => {
        localStorage.setItem("businessId", business.key)
        props.clienteSelectedBusiness(business)
        localStorage.setItem("businessName", business.name)
    }

    let businesses = Object.values(props.businesses).map(
        business => {

            if (business.desc.toUpperCase().includes(businessDesc.toUpperCase())) {
                return <NavLink
                    onClick={() => {
                        props.clientClickBusiness();
                        selectedBusiness(business);
                    }}
                    key={business.key[0]}
                    to={{
                        pathname: "/VerNegocio",
                        photoBusiness: business.photoBusiness,
                        isToGo: business.delivery.isToGo,
                        cash: business.payment.cash,
                        creditCard: business.payment.creditCard
                    }}>
                    <PlaceCard
                        businessId={business.key[0]}
                        name={business.name}
                        isToGo={business.delivery.isToGo}
                        isToTake={business.delivery.isToTake}
                        cash={business.payment.cash}
                        creditCard={business.payment.creditCard}
                        rate={business.rate}
                        photoBusiness={business.photoBusiness}
                        desc={business.desc}
                        distance={business.distance}
                        horaAbierto={business.schedule.horaAbierto}
                        horaCerrado={business.schedule.horaCerrado}
                    />
                </NavLink>
            } else return <Fragment key={business.key[0]} ></Fragment>;
        }
    )

    if (businesses.length === 0) {
        businesses = <h4 style={{ textAlign: "center" }}>Negocios fuera de tu locación</h4>
    }
    return (
        <>
            <div className={classes.Search_section} >
                <TextField
                    style={{
                        left: "4em"
                    }}
                    type='text'
                    label="Buscar Negocio"
                    value={businessDesc}
                    onChange={(event) => {
                        typeBusiness(event.target.value)
                    }} />
                <Lupa />
            </div>
            {/* <div className={classes.Search_section} >
                <TextField
                    disabled
                    label="Estas en:"
                    variant="outlined" />
            </div> */}

            <div className={classes.Search_container}>
                {businesses &&
                    businesses}
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clienteSelectedBusiness: (business) => dispatch(action.clienteSelectedBusiness(business)),
        clientClickBusiness: () => dispatch(action.ClientClickLogo())

    }
}

export default connect(null, mapDispatchToProps)(Search);