import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 0,
  lng: 0,
};

function Map({ onPinDrop, selectedLocation }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const handleClick = (event) => {
    const newPin = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPin(newPin);
    onPinDrop(newPin);
  };

  useEffect(() => {
    if (mapRef && selectedLocation) {
      mapRef.panTo(selectedLocation);
      mapRef.setZoom(14);
    }
  }, [selectedLocation, mapRef]);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onClick={handleClick}
      onLoad={onMapLoad}
    >
      {selectedPin && (
        <Marker
          position={selectedPin}
          onClick={() => {
            setSelectedPin(null);
          }}
        />
      )}
      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  );
}

export default React.memo(Map);
