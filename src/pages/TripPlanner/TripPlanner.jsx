import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTripPlanner } from "hooks/useTripPlanner";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import IconCancel from "img/icons/icon-cancel.svg";
import backgroundImageUrls from "data/backgroundImageData";

const TripPlanner = () => {
  const {
    errorMessage,
    setErrorMessage,
    imageIndex,
    setImageIndex,
    blurValue,
    setBlurValue,
    findItineraryStartInput,
    setFindItineraryStartInput,
    findItineraryEndInput,
    setFindItineraryEndInput,
    availableStartLocations,
    showAvailableStartLocations,
    setShowAvailableStartLocations,
    availableEndLocations,
    showAvailableEndLocations,
    setShowAvailableEndLocations,
    handleFindItineraryEnd,
    handleSelectStartLocation,
    handleSelectEndLocation,
    findRouteCoords,
    availableStartLocationsHistory,
    availableEndLocationsHistory
  } = useTripPlanner();

  const BackgroundImage = () => {
    return (
      <img
        className="trip-planner__background"
        style={{ filter: `blur(${blurValue / 2}px)` }}
        src={backgroundImageUrls.images[imageIndex]}
        alt="background image"
      />
    );
  };

  const AvailableStartLocationsList = () => {
    const resetStartQuery = location => {
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
          {availableStartLocations.map(location => (
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
      availableStartLocationsHistory.length > 0
    ) {
      return (
        <ul
          ref={availableStartLocationsListRef}
          className="trip-planner__locations-list">
          {availableStartLocationsHistory.map(location => (
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

  const AvailableEndLocationsList = () => {
    const resetEndQuery = location => {
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
          {availableEndLocations.map(location => (
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
      availableEndLocationsHistory.length > 0
    ) {
      return (
        <ul
          ref={availableEndLocationsListRef}
          className="trip-planner__locations-list">
          {availableEndLocationsHistory.map(location => (
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

  const availableStartLocationsListRef = useRef(null);
  const closeAvailableStartLocationsListOnClickOutside = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
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
  const closeAvailableEndLocationsListOnClickOutside = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
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

  useEffect(() => {
    if (
      findItineraryStartInput.length > 0 &&
      findItineraryStartInput.length < 10
    ) {
      setBlurValue(findItineraryStartInput.length);
    }
    if (findItineraryEndInput.length > 0 && findItineraryEndInput.length < 10) {
      setBlurValue(findItineraryEndInput.length);
    }
  }, [findItineraryStartInput, findItineraryEndInput]);

  useEffect(() => {
    const getRandomInt = (max = backgroundImageUrls.images.length) => {
      setImageIndex(Math.floor(Math.random() * max));
    };
    getRandomInt();
  }, []);

  return (
    <div className="trip-planner container">
      <h1>Trip Planner</h1>
      <main className="trip-planner__search-inputs">
        <BackgroundImage />

        <div className="trip-planner__search-input">
          <input
            placeholder="From"
            onChange={event => setFindItineraryStartInput(event.target.value)}
            onClick={() => {
              findItineraryStartInput === "" &&
                setShowAvailableStartLocations(true);
              setErrorMessage("");
            }}
            value={findItineraryStartInput}
          />
          <button
            className="trip-planner__button trip-planner__button--clear"
            onClick={() => setFindItineraryStartInput("")}>
            <img
              src={IconCancel}
              alt="icon cancel"
            />
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
              setErrorMessage("");
            }}
            value={findItineraryEndInput}
          />
          <button
            className="trip-planner__button trip-planner__button--clear"
            onClick={() => setFindItineraryEndInput("")}>
            <img
              src={IconCancel}
              alt="icon cancel"
            />
          </button>
          <AvailableEndLocationsList />
        </div>
        <button
          className="trip-planner__button trip-planner__button--search"
          onClick={findRouteCoords}>
          Let&#39;s go!
        </button>
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </main>
    </div>
  );
};

export default TripPlanner;
