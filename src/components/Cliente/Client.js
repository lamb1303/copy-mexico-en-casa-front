import React, { useEffect, useCallback, useState } from 'react';
import Search from './Search/Search';
import classes from './Client.module.css';
import { connect } from 'react-redux';
import axios from "axios";
import * as action from '../../store/actions';

const Client2 = props => {
    const { geolocation } = props

    const [direction, getDirection] = useState({})
    const { getClient, id, client, getBusinesses } = props;
    useEffect(useCallback(() => {
        getClient(id);
    }, [id, getClient]),[id,getClient]);

    useEffect(useCallback(() => {
        if (!client) return;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                getBusinesses(lat, lng)
                if (lat && lng === '') {
                    const clientLat = geolocation.lat
                    const clientLng = geolocation.lng
                    axios
                        .get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${clientLat}&lon=${clientLng}`
                        )
                        .then((resp) => {
                            getDirection(resp.data.address)
                        })
                        .catch((err) => { });
                } else {
                    axios
                        .get(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                        )
                        .then((resp) => {
                            getDirection(resp.data.address)
                        })
                        .catch((err) => { });
                }

            }, error => {
                if (client.geolocation) getBusinesses(client.geolocation.lat, client.geolocation.lng)
            })
        } else if (client.geolocation) getBusinesses(client.geolocation.lat, client.geolocation.lng)


    }), [client]);

    return (
        <div className={classes.client} >
            <Search
                village={direction.village}
                city={direction.city}
                country={direction.country}
                county={direction.county}
                postcode={direction.postcode}
                road={direction.road}
                state={direction.state}
                businesses={props.businesses} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        businesses: state.cliente.businesses,
        id: state.home.id,
        client: state.cliente.cliente,
        geolocation: state.cliente.geolocation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBusinesses: (lat, lng) => dispatch(action.getBusinesses(lat, lng)),
        getClient: (id) => dispatch(action.getClient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client2);