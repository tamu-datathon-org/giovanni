import LocationMap from "./LocationMap";
import InvitationCard from "./InvitationCard";
import React from "react";

const EventInfo = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      <InvitationCard />
      <LocationMap />
    </div>
  );
};

export default EventInfo;
