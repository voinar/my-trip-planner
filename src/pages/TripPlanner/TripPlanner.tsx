import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTripPlanner } from "hooks/useTripPlanner";
import IconError from "img/icons/icon-info-error.svg";

const TripPlanner = () => {
  const {
    // userLocation,
    // setUserLocation,
    errorMessage,
    setErrorMessage,
    findItineraryStartInput,
    setFindItineraryStartInput,
    findItineraryEndInput,
    setFindItineraryEndInput,
    availableStartLocations,
    setAvailableStartLocations,
    showAvailableStartLocations,
    setShowAvailableStartLocations,
    availableEndLocations,
    showAvailableEndLocations,
    setShowAvailableEndLocations,
    handleFindItineraryStart,
    handleFindItineraryEnd,
    handleSelectStartLocation,
    handleSelectEndLocation,
    findRouteCoords,
    availableStartLocationsHistory,
    setAvailableStartLocationsHistory,
    availableEndLocationsHistory,
    setAvailableEndLocationsHistory
  } = useTripPlanner();

  const ErrorMessage = (props: any) =>
    !errorMessage ? null : (
      <div className="error-message">
        <img src={IconError} />
        {props.errorMessage}
      </div>
    );

  const AvailableStartLocationsList: any = () => {
    const resetStartQuery = (location: any) => {
      setShowAvailableStartLocations(false);
      setFindItineraryStartInput(location);
    };

    if (
      showAvailableStartLocations === true &&
      availableStartLocations.length > 1 &&
      findItineraryStartInput.length > 0
    ) {
      return (
        <ul
          ref={availableStartLocationsListRef}
          className="trip-planner__locations-list">
          {availableStartLocations.map((location: any) => (
            <li
              key={uuidv4()}
              onClick={() => handleSelectStartLocation(location)}>
              {location.display_name}
            </li>
          ))}
        </ul>
      );
    }

    if (
      findItineraryStartInput.length === 0 &&
      showAvailableStartLocations === true &&
      availableStartLocations.length > 0
    ) {
      return (
        <ul
          ref={availableStartLocationsListRef}
          className="trip-planner__locations-list">
          {availableStartLocationsHistory.map((location: any) => (
            <li
              key={uuidv4()}
              onClick={() => resetStartQuery(location)}>
              {location}
            </li>
          ))}
        </ul>
      );
    }
  };

  const AvailableEndLocationsList: any = () => {
    const resetEndQuery = (location: any) => {
      setShowAvailableEndLocations(false);
      setFindItineraryEndInput(location);
    };

    if (
      showAvailableEndLocations === true &&
      availableEndLocations.length > 1 &&
      findItineraryEndInput.length > 0
    ) {
      return (
        <ul
          ref={availableEndLocationsListRef}
          className="trip-planner__locations-list">
          {availableEndLocations.map((location: any) => (
            <li
              key={uuidv4()}
              onClick={() => handleSelectEndLocation(location)}>
              {location.display_name}
            </li>
          ))}
        </ul>
      );
    }

    if (
      findItineraryEndInput.length === 0 &&
      showAvailableEndLocations === true &&
      availableEndLocations.length > 0
    ) {
      return (
        <ul
          ref={availableEndLocationsListRef}
          className="trip-planner__locations-list">
          {availableEndLocationsHistory.map((location: any) => (
            <li
              key={uuidv4()}
              onClick={() => resetEndQuery(location)}>
              {location}
            </li>
          ))}
        </ul>
      );
    }
  };

  // const AvailableEndLocationsList = () => {
  //   return availableEndLocations.length > 0 &&
  //     showAvailableEndLocations === true ? (
  //     <ul
  //       ref={availableEndLocationsListRef}
  //       className="trip-planner__locations-list">
  //       {availableEndLocations.map((location: any) => (
  //         <li
  //           key={uuidv4()}
  //           onClick={() => handleSelectEndLocation(location)}>
  //           {location.display_name}
  //         </li>
  //       ))}
  //     </ul>
  //   ) : null;
  // };

  const availableStartLocationsListRef = useRef(null);
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

  const availableEndLocationsListRef = useRef(null);
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
      <h1>Trip Planner</h1>
      <div className="trip-planner__search-inputs">
        <img
          className="trip-planner__background"
          src="https://images.unsplash.com/photo-1604351888999-9ea0a2851e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80"
          alt="background image"
        />
        <div className="trip-planner__search-input">
          <input
            placeholder="From"
            onChange={event => setFindItineraryStartInput(event.target.value)}
            onClick={() => {
              findItineraryStartInput === "" &&
                setShowAvailableStartLocations(true);
            }}
            value={findItineraryStartInput}
          />
          <button
            className="trip-planner__button trip-planner__button--clear"
            onClick={() => setFindItineraryStartInput("")}>
            x
          </button>
          <AvailableStartLocationsList />
        </div>
        <div className="trip-planner__search-input">
          <input
            placeholder="To"
            onChange={handleFindItineraryEnd}
            onClick={() => {
              findItineraryEndInput === "" &&
                setShowAvailableEndLocations(true);
            }}
            value={findItineraryEndInput}
          />
          <button
            className="trip-planner__button trip-planner__button--clear"
            onClick={() => setFindItineraryEndInput("")}>
            x
          </button>
          <AvailableEndLocationsList />
        </div>
        <button
          className="trip-planner__button trip-planner__button--search"
          onClick={findRouteCoords}>
          Let&#39;s go!
        </button>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default TripPlanner;
