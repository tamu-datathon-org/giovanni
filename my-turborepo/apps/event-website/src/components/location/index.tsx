"use client";
import "./location.css";

const PLANT_LEFT = "/images/location/plant-left.png";
const PLANT_RIGHT = "/images/location/plant-right.png";

/* Two location panel designs (blue, green) repeated for alternating scalloped row of location panels */
const LOCATION_PANEL_BLUE = "/images/location/location-panel-blue.svg";
const LOCATION_PANEL_GREEN = "/images/location/location-panel-green.svg";
const locationPanels = [LOCATION_PANEL_BLUE, LOCATION_PANEL_GREEN, LOCATION_PANEL_BLUE, LOCATION_PANEL_GREEN, LOCATION_PANEL_BLUE, LOCATION_PANEL_GREEN, LOCATION_PANEL_BLUE, LOCATION_PANEL_GREEN];

export default function Location() {
  return (
    <section
      id="location"
      aria-label="Event Info"
      className="location-section"
    >
      <div className="location-panel-wrapper">
        {/* Left side plant – hangs from above-left of panel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLANT_LEFT}
          alt=""
          className="location-plant-left"
          aria-hidden
        />

        {/* Right side plant – hangs from above-right of panel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLANT_RIGHT}
          alt=""
          className="location-plant-right"
          aria-hidden
        />

        {/* Brown rounded panel */}
        <div className="location-panel">
          {/* Location panels row: 8 location panel SVGs draping from panel top */}
          <div className="location-panels-row" aria-hidden>
            {locationPanels.map((src, i) => (
              <div key={i} className="location-panels-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </div>
            ))}
          </div>

          {/* All panel text/UI content sits above the location panels row */}
          <div className="location-content">
            {/* EVENT INFO pill header */}
            <div className="location-header">
              <div className="location-header__outer">
                <div className="location-header__inner">
                  <span className="location-header__label font-darumadrop-one">
                    EVENT INFO
                  </span>
                </div>
              </div>
            </div>

            {/* First text block – right-side of zigzag */}
            <div className="location-text--right">
              <p className="font-chilanka whitespace-pre-line">
                {"datathon is a\nlorem ipsum blah lah blah"}
              </p>
            </div>

            {/* Dashed divider – center of zigzag */}
            <div className="location-divider">
              <span className="font-chilanka">
                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
              </span>
            </div>

            {/* Second text block – left side of zigzag */}
            <div className="location-text--left">
              <p className="font-chilanka">lorem ipsum blah lah blah</p>
            </div>
          </div>
        </div>

        {/* Bear mascot – overhangs panel bottom-left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/location/bear.png"
          alt=""
          className="location-bear"
          aria-hidden
        />
      </div>
    </section>
  );
}
