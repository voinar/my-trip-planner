import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Popup,
  useMapEvents
} from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { useFindLocation } from "hooks/useFindLocation";

const FindLocation = () => {
  const {
    zoomLevel,
    setZoomLevel,
    userLocation,
    setUserLocation,
    findLocationInput,
    setFindLocationInput,
    findingLocationLoading,
    setFindingLocationLoading,
    availableLocations,
    setAvailableLocations,
    showAvailableLocations,
    setShowAvailableLocations,
    handleFindLocationInput,
    findLocationCoords,
    handleSelectedLocation
  } = useFindLocation();

  const locationsListRef = useRef(null);

  const MapWidget = () => (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={[userLocation[0], userLocation[1]]}
      zoom={zoomLevel}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userLocation[0], userLocation[1]]}></Marker>
    </MapContainer>
  );

  const AvailableLocationsList = () => {
    return availableLocations.length > 0 && showAvailableLocations === true ? (
      <ul
        ref={locationsListRef}
        className="locations-list">
        {availableLocations.map((location: any) => (
          <li
            key={uuidv4()}
            onClick={() => handleSelectedLocation(location.lat, location.lon)}>
            {location.display_name}
          </li>
        ))}
      </ul>
    ) : null;
  };

  const closeAvailableLocationsListOnClickOutside = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAvailableLocations(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  closeAvailableLocationsListOnClickOutside(locationsListRef);

  return (
    <div className="trip-planner container">
      <h1>Find Location</h1>
      <div className="trip-planner__search-inputs">
        <div className="trip-planner__search-input">
          <input
            placeholder="Enter address"
            onChange={handleFindLocationInput}
          />
          <button onClick={findLocationCoords}>
            {findingLocationLoading ? "Finding location..." : "Search"}
          </button>
          <AvailableLocationsList />
        </div>
      </div>
      <div className="trip-planner__map">
        <MapWidget />
      </div>
    </div>
  );
};

export default FindLocation;
