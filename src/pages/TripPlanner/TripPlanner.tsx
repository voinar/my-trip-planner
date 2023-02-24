import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTripPlanner } from "hooks/useTripPlanner";

const TripPlanner = () => {
  const {
    // userLocation,
    // setUserLocation,
    findItineraryStartInput,
    findItineraryEndInput,
    findItineraryStartCoords,
    findItineraryEndCoords,
    availableStartLocations,
    showAvailableStartLocations,
    setShowAvailableStartLocations,
    availableEndLocations,
    showAvailableEndLocations,
    setShowAvailableEndLocations,
    handleFindItineraryStart,
    handleFindItineraryEnd,
    handleSelectStartLocation,
    handleSelectEndLocation,
    findRouteCoords
  } = useTripPlanner();

  const availableStartLocationsListRef = useRef(null);
  const availableEndLocationsListRef = useRef(null);

  const AvailableStartLocationsList = () => {
    return availableStartLocations.length > 0 &&
      showAvailableStartLocations === true ? (
      <ul
        ref={availableStartLocationsListRef}
        className="locations-list">
        {availableStartLocations.map((location: any) => (
          <li
            key={uuidv4()}
            onClick={() => handleSelectStartLocation(location)}>
            {location.display_name}
          </li>
        ))}
      </ul>
    ) : null;
  };

  const AvailableEndLocationsList = () => {
    return availableEndLocations.length > 0 &&
      showAvailableEndLocations === true ? (
      <ul
        ref={availableEndLocationsListRef}
        className="locations-list">
        {availableEndLocations.map((location: any) => (
          <li
            key={uuidv4()}
            onClick={() => handleSelectEndLocation(location)}>
            {location.display_name}
          </li>
        ))}
      </ul>
    ) : null;
  };

  const closeAvailableStartLocationsListOnClickOutside = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAvailableStartLocations(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  closeAvailableStartLocationsListOnClickOutside(
    availableStartLocationsListRef
  );

  const closeAvailableEndLocationsListOnClickOutside = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAvailableEndLocations(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  closeAvailableEndLocationsListOnClickOutside(availableEndLocationsListRef);

  return (
    <div className="trip-planner container">
      <h1>TripPlanner</h1>
      <div className="trip-planner__search-inputs">
        <div className="trip-planner__search-input">
          <input
            placeholder="From"
            onChange={handleFindItineraryStart}
            value={findItineraryStartInput}
          />
          {/* <button onClick={findItineraryStartCoords}>Set start</button> */}
          <AvailableStartLocationsList />
        </div>
        <div className="trip-planner__search-input">
          <input
            placeholder="To"
            onChange={handleFindItineraryEnd}
            value={findItineraryEndInput}
          />
          {/* <button onClick={findItineraryEndCoords}>Set destination</button> */}
          <AvailableEndLocationsList />
        </div>
        <button onClick={findRouteCoords}>Find route</button>
      </div>
    </div>
  );
};

export default TripPlanner;
