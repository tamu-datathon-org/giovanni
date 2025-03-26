import GoogleMapReact from "google-map-react/dist/GoogleMapReact";
import React from "react";
const LocationMap = () => {
  const location = {
    lat: 30.6183, // Replace with actual latitude
    lng: -96.3364, // Replace with actual longitude
    address: "215 Lamar St, College Station, TX 77844",
  };

  return (
    <div style={{ height: "300px", width: "100%", border: "1px solid black" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: location.lat, lng: location.lng }}
        defaultZoom={17}
      >
        <div lat={location.lat} lng={location.lng}>
          📍 {location.address}
        </div>
      </GoogleMapReact>
    </div>
  );
};
export default LocationMap;
