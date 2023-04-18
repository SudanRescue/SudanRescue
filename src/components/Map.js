import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 0,
  lng: 0,
};

function Map({ onPinDrop }) {
  const [selectedPin, setSelectedPin] = useState(null);

  const handleClick = (event) => {
    const newPin = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPin(newPin);
    onPinDrop(newPin);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onClick={handleClick}
    >
      {selectedPin && (
        <Marker
          position={selectedPin}
          onClick={() => {
            setSelectedPin(null);
          }}
        />
      )}
    </GoogleMap>
  );
}

export default React.memo(Map);
