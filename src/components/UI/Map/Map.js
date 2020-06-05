import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as GeoSearch from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import Marker from '../../../assets/marker.png';
import classes from './Map.module.css';

export default class Map extends React.Component {

    state = {
        cords: {}
    }

    componentDidMount() {
        let myMap;
        let lat = 25.473872;
        let lng = -100.976701;
        let name = 'Tu negocio'

        if (this.props.coords) {
            lat = this.props.coords.lat;
            lng = this.props.coords.lng;
        }

        if (this.props.name) name = this.props.name;

        myMap = L.map('map').setView([lat, lng], 17)


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
        }).addTo(myMap)

        const iconMarker = L.icon({
            iconUrl: Marker,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        })

        let marker = L.marker([lat, lng], {
            icon: iconMarker
        }).addTo(myMap)

        myMap.doubleClickZoom.disable();

        myMap.on('dblclick', e => {
            let coords = myMap.mouseEventToLatLng(e.originalEvent)
            marker.setLatLng([coords.lat, coords.lng])
            this.props.getCoords(coords)
        })
        // const point = L.point(-10, -20);
        marker.bindTooltip(name, { permanent: true, }).openTooltip();

        const search = new GeoSearch.GeoSearchControl({
            provider: new GeoSearch.OpenStreetMapProvider(),
            showMarker: true,
            
            autoClose: true,
            searchLabel: 'Buscar direccion',
            keepResult: true,
            style: 'bar'
        });
        myMap.addControl(search)

        // myMap.on('geosearch/showlocation', e => {
        //     const coords = {
        //         lat: e.marker._latlng.lat,
        //         lng: e.marker._latlng.lng
        //     }
        //     // marker.setLatLng([coords.lat, coords.lng])
        //     console.log(e);
        //     this.props.getCoords(coords)
        // })
    }

    // style = {
    //     width: '90%',
    //     top: '0',
    //     left: '0',
    //     right: '0',
    //     bottom: '0',
    //     margin: 'auto',
    //     height: '70%',
    //     position: 'fixed',
    //     zIndex: '205',
    //     outline: 'none',
    // }

    render() {
        // return <div style={this.style} id='map' />
        return <div className={classes.map} id='map' />
    }
}
