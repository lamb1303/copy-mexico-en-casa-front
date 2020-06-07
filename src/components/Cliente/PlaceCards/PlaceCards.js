import React, { Component } from 'react';
import PlaceCard from './PlaceCard/PlaceCard';
import { connect } from 'react-redux';
import * as action from '../../../store/actions'
import { NavLink } from 'react-router-dom';

class PlaceCards extends Component {

    componentDidMount() {
        this.props.getBusinesses()
    }

    //Save a business in selectedBusiness:{}

    selectedBusiness= (business) =>{
        localStorage.setItem("businessId", business.key)
        this.props.clienteSelectedBusiness(business)
    }

    render() {
        const businesses = Object.values(this.props.businesses).map(
            business => {
                return <NavLink onClick = {()=> this.selectedBusiness(business)} key={business.key} to="/Negocio">
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
}

const mapStateToProps = state => {
    return {
        businesses: state.cliente.businesses,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBusinesses: () => dispatch(action.getBusinesses()),
        clienteSelectedBusiness: (business) => dispatch(action.clienteSelectedBusiness(business))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCards);