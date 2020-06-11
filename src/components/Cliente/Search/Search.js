import React, { useState } from 'react';
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
    }

    const businesses = Object.values(props.businesses).map(
        business => {
            if (business.desc.includes(businessDesc)) {
                return <NavLink
                    onClick={() => selectedBusiness(business)}
                    key={business.key}
                    to={{
                        pathname: "/VerNegocio",
                        photoBusiness: business.photoBusiness
                    }}>
                    <PlaceCard
                        key={business.key}
                        businessId={business.key}
                        name={business.name}
                        isToGo={business.delivery.isToGo}
                        rate={business.rate}
                        photoBusiness={business.photoBusiness}
                        desc={business.desc}
                    />
                </NavLink>
            } else {
                return <Lupa key={Math.random()} />
            }
        }
    )

    return (
        <>
            <div className={classes.Search_section} >
                <TextField
                    style={{left: "3em"}}
                    type='text'
                    label="Buscar Negocio"
                    value={businessDesc}
                    onChange={(event) => {
                        typeBusiness(event.target.value)
                    }} />
                <Lupa />
            </div>
            {businesses}
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clienteSelectedBusiness: (business) => dispatch(action.clienteSelectedBusiness(business))
    }
}

export default connect(null, mapDispatchToProps)(Search);