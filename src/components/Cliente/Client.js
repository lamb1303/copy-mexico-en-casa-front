import React, { useEffect, useCallback } from 'react';
import Search from './Search/Search';
import classes from './Client.module.css';
import { connect } from 'react-redux';
import * as action from '../../store/actions';

const Client2 = props => {

    const { getClient, id, client, getBusinesses } = props;

    useEffect(useCallback(() => {
        getClient(id);
    }, [id, getClient]), []);

    useEffect(useCallback(() => {
        if(!client) return;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                getBusinesses(lat, lng)
            }, error => {
                if (client.geolocation) getBusinesses(client.geolocation.lat, client.geolocation.lng)
            })
        } else if (client.geolocation) getBusinesses(client.geolocation.lat, client.geolocation.lng)


    }, [client, getBusinesses]), [client]);

    return (
        <div className={classes.client} >
            <Search businesses={props.businesses} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        businesses: state.cliente.businesses,
        id: state.home.id,
        client: state.cliente.cliente
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBusinesses: (lat, lng) => dispatch(action.getBusinesses(lat, lng)),
        getClient: (id) => dispatch(action.getClient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client2);