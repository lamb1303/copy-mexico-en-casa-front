import React, { useState } from 'react';
import Map from '../../../UI/Map/Map';
import Button from '../../../UI/Button/Button';
import classes from './showMap.module.css';

const ShowMap = props => {
    const [markerVisible, setMarkerVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(props.coordinates);

    const handleSelectPositionInMap = () => {
        if (currentPosition !== null) props.getCoords(currentPosition)
    }

    return (
        <div className={classes.showMap} >
            <Map name={props.nombre} coords={props.coordinates} getCoords={(c) => setCurrentPosition(c)} setDisable={(disabled) => setMarkerVisible(disabled)} />
            <Button btnType='Success' disabled={markerVisible} clicked={() => handleSelectPositionInMap()} >SELECCIONAR</Button>
        </div>
    )
}

export default ShowMap;