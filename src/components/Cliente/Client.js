import React, { Component } from 'react';
import Search from './Search/Search';
import classes from './Client.module.css';
import { connect } from 'react-redux';
import * as action from '../../store/actions';

class Client2 extends Component {

    componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { 
                this.lat = position.coords.latitude
                this.lng = position.coords.longitude
                this.props.getBusinesses(this.lat, this.lng)
            })

        } else {
            console.log(alert("Error: Sin acceso a localizacion"))
        }
       

    }

    render() {
        return (
            <div className={classes.client} >
                <Search businesses={this.props.businesses} />
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
        getBusinesses: (lat, lng) => dispatch(action.getBusinesses(lat, lng))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client2);