import React, { useState } from "react";
import Map from '../Map/Map';
import Button from '../Button/Button'
import classes from './ShowMap.module.css';

const ShowMap = (props) => {
  const [markerVisible, setMarkerVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(props.coordinates);
  const [currentAddress, setCurrentAddress] = useState(props.address);

  const handleSelectPositionInMap = () => {
    const address = `${currentAddress.road} #Num, C.P. ${currentAddress.postcode}, ${currentAddress.city}`;
    if (currentPosition !== null) props.getCoords(currentPosition, address);
  };

  return (
    <div className={classes.showMap}>
      <Map
        name={props.nombre}
        getAddress={(address) => setCurrentAddress(address)}
        coords={props.coordinates}
        getCoords={(c) => setCurrentPosition(c)}
        setDisable={(disabled) => setMarkerVisible(disabled)}
      />
      <Button
        btnType="Success"
        disabled={markerVisible}
        clicked={() => handleSelectPositionInMap()}
      >
        SELECCIONAR
      </Button>
    </div>
  );
};

export default ShowMap;
