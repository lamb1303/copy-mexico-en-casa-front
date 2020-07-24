import React, { useState } from "react";
import Map from '../Map/Map';
import Card from '../Card/Card';
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import classes from './ShowMap.module.scss';

const ERROR = {
  visible: false,
  message: ''
}

const ShowMap = (props) => {
  const [markerVisible, setMarkerVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(props.coordinates);
  const [currentAddress, setCurrentAddress] = useState(props.address);
  const [error, setError] = useState(ERROR);

  const handleSelectPositionInMap = () => {
    if (currentAddress.road === undefined) return;
    if (!currentAddress.road) {
      setError({ visible: true, message: 'ALGO SALIO MAL. POR FAVOR VUELVE A SELECCIONAR UNA UBICACION' });
      return;
    }

    const city = currentAddress.county ? currentAddress.county : currentAddress.city;
    const address = `${currentAddress.road}, C.P. ${currentAddress.postcode}, ${city}`;
    if (currentPosition !== null) props.getCoords(currentPosition, address);
  };

  if (error.visible) {
    setTimeout(() => {
      setError({ visible: false, message: '' })
    }, 5000);
  }

  return (
    <>
      {error.visible && <Alert title='Error' > {error.message} </Alert>}
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
    </>
  );
};

export default ShowMap;
