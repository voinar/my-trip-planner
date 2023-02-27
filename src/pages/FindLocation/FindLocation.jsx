import React, { useEffect, useRef, useCallback } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { useFindLocation } from "hooks/useFindLocation";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const FindLocation = () => {
  const {
    zoomLevel,
    userLocation,
    findingLocationLoading,
    availableLocations,
    showAvailableLocations,
    setShowAvailableLocations,
    handleFindLocationInput,
    findLocationCoords,
    handleSelectedLocation,
    errorMessage,
    setErrorMessage
  } = useFindLocation();

  const locationsListRef = useRef(null);

  const MapWidget =
  useCallback(
    () => (
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
    ),
    [userLocation]
  );

  const AvailableLocationsList = () => {
    return availableLocations.length > 0 && showAvailableLocations === true ? (
      <ul
        ref={locationsListRef}
        className="trip-planner__locations-list">
        {availableLocations.map(location => (
          <li
            key={uuidv4()}
            onClick={() => handleSelectedLocation(location.lat, location.lon)}>
            {location.display_name}
          </li>
        ))}
      </ul>
    ) : null;
  };

  const closeAvailableLocationsListOnClickOutside = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
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
      <div className="trip-planner__find-location">
        <div className="trip-planner__search-input">
          <input
            placeholder="Enter address"
            onChange={handleFindLocationInput}
          />
          <button
            className="trip-planner__find-location__search-button"
            onClick={findLocationCoords}>
            {findingLocationLoading ? "Finding location..." : "Search"}
          </button>
          <AvailableLocationsList />
        </div>
      </div>
      <div className="trip-planner__find-location__map">
        <MapWidget />
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default FindLocation;
