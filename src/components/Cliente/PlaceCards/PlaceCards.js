import React, { Component } from 'react';
import PlaceCard from './PlaceCard/PlaceCard';
import { connect } from 'react-redux';
import * as action from '../../../store/actions'
import { NavLink } from 'react-router-dom';

const PlaceCards = props => {

    const selectedBusiness = (business) => {
        localStorage.setItem("businessId", business.key)
        props.clienteSelectedBusiness(business)
    }

    const businesses = Object.values(props.businesses).map(
        business => {
            return <NavLink onClick={() => selectedBusiness(business)} key={business.key} to="/VerNegocio">
                <PlaceCard
                    businessId={business.key}
                    name={business.name}
                    isToGo={business.delivery.isToGo}
                    rate={business.rate}
                    photoBusiness={business.photoBusiness}
                    desc={business.desc}
                />
            </NavLink>

        }
    )
    return (
        <div>
            {businesses}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        clienteSelectedBusiness: (business) => dispatch(action.clienteSelectedBusiness(business))
    }
}

export default connect(null, mapDispatchToProps)(PlaceCards);