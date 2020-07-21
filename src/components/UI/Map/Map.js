import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as GeoSearch from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import Marker from "../../../assets/marker.png";
import classes from "./Map.module.css";
import axios from "axios";
import { connect } from "react-redux";

class Map extends React.Component {
  componentDidMount() {
    let myMap;
    let lat = 25.473872;
    let lng = -100.976701;
    let name = "Tú estas aqui";

    if (this.props.coords) {
      lat = this.props.coords.lat;
      lng = this.props.coords.lng;
    }

    if (this.props.name) name = this.props.name;
    myMap = L.map("map").setView([lat, lng], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17,
    }).addTo(myMap);

    const iconMarker = L.icon({
      iconUrl: Marker,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    let marker = L.marker([lat, lng], {
      icon: iconMarker,
    })
    
    if(this.props.geolocation || this.props.coords) marker.addTo(myMap);

    myMap.doubleClickZoom.disable();

    myMap.on("dblclick", (e) => {
      let coords = myMap.mouseEventToLatLng(e.originalEvent);
      marker.setLatLng([coords.lat, coords.lng]).addTo(myMap);
      this.props.getCoords(coords);
      this.props.setDisable(false);
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
        )
        .then((resp) => this.props.getAddress(resp.data.address))
        .catch((err) => {});
    });
    // const point = L.point(-10, -20);
    marker.bindTooltip(name, { permanent: true }).openTooltip();

    marker.on("click", (e) => {
      marker.removeFrom(myMap);
      this.props.setDisable(true);
    });

    const search = new GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      autoClose: true,
      searchLabel: "Buscar direccion",
      keepResult: true,
      style: "bar",
    });
    myMap.addControl(search);
  }

  render() {
    return <div className={classes.map} id="map" />;
  }
}

const mapStateToProps = state => {
  return {
    geolocation: state.registro.geolocation
  }
}

export default connect(mapStateToProps)(Map);
