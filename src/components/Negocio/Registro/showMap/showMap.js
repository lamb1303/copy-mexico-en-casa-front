import React, { useState } from 'react';
import Map from '../../../UI/Map/Map';
import Button from '../../../UI/Button/Button';
import classes from './showMap.module.css';

const ShowMap = props => {
    const [currentPosition, setCurrentPosition] = useState(props.coordinates);

    const handleSelectPositionInMap = () => {
        if (currentPosition !== null) props.getCoords(currentPosition)
    }

    return (
        <div className={classes.showMap} >
            <Map name={props.nombre} coords={props.coordinates} getCoords={(c) => setCurrentPosition(c)} />
            <Button btnType='Success' clicked={() => handleSelectPositionInMap()} >SELECCIONAR</Button>
        </div>
    )
}

export default ShowMap;