import React from "react";

const LocationMap = () => {
  const location = {
    lat: 30.6183, // Replace with actual latitude
    lng: -96.3364, // Replace with actual longitude
    address: "215 Lamar St, College Station, TX 77844",
  };

  // TODO: Install google-map-react package or use alternative map solution
  // import GoogleMapReact from "google-map-react";
  
  return (
    <div style={{ height: "300px", width: "100%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        📍 {location.address}
      </div>
    </div>
  );
};
export default LocationMap;
