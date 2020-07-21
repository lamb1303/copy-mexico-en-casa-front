import React, { useState } from "react";
import Map from '../Map/Map';
import Card from '../Card/Card';
import Button from '../Button/Button'
import classes from './ShowMap.module.scss';

const ShowMap = (props) => {
  const [markerVisible, setMarkerVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(props.coordinates);
  const [currentAddress, setCurrentAddress] = useState(props.address);

  const handleSelectPositionInMap = () => {
    if(currentAddress.road === undefined) return;
    const address = `${currentAddress.road}, C.P. ${currentAddress.postcode}, ${currentAddress.county}`;
    if (currentPosition !== null) props.getCoords(currentPosition, address);
  };

  return (
    <div className={classes.showMap}>
      <div className={classes.instructions} onClick={() => props.closeBackdrop()}>
        <Card >Por favor. Selecciona tu ubicacion</Card>
      </div>
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
