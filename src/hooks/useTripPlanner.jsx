import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorMessage } from "hooks/useErrorMessage";
import {
  useLocationHistory,
  useUpdateLocationHistory
} from "context/LocationHistoryContext";
import axios from "axios";

export const useTripPlanner = () => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [imageIndex, setImageIndex] = useState(0);
  const [blurValue, setBlurValue] = useState(0);
  const [itineraryStart, setItineraryStart] = useState([]);
  const [itineraryEnd, setItineraryEnd] = useState([]);
  const [findingLocationLoading, setFindingLocationLoading] = useState(false);
  const [availableStartLocations, setAvailableStartLocations] = useState([]);
  const [availableStartLocationsHistory, setAvailableStartLocationsHistory] =
    useState([]);
  const [availableEndLocations, setAvailableEndLocations] = useState([]);
  const [availableEndLocationsHistory, setAvailableEndLocationsHistory] =
    useState([]);
  const [showAvailableStartLocations, setShowAvailableStartLocations] =
    useState(false);
  const [showAvailableEndLocations, setShowAvailableEndLocations] =
    useState(false);
  const [findItineraryStartInput, setFindItineraryStartInput] = useState("");
  const [findItineraryEndInput, setFindItineraryEndInput] = useState("");

  const locationHistory = useLocationHistory();
  const updateLocationHistory = useUpdateLocationHistory();

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleSelectStartLocation = location => {
    setItineraryStart([Number(location.lat), Number(location.lon)]);
    setFindItineraryStartInput(location.display_name);
    setShowAvailableStartLocations(false);

    if (!availableStartLocationsHistory.includes(location.display_name)) {
      setAvailableStartLocationsHistory(prevState => [
        ...prevState,
        location.display_name
      ]);
    }
  };

  const handleSelectEndLocation = location => {
    setItineraryEnd([Number(location.lat), Number(location.lon)]);
    setFindItineraryEndInput(location.display_name);
    setShowAvailableEndLocations(false);

    if (!availableEndLocationsHistory.includes(location.display_name)) {
      setAvailableEndLocationsHistory(prevState => [
        ...prevState,
        location.display_name
      ]);
    }
  };

  const handleFindItineraryStart = event => {
    setFindItineraryStartInput(event.target.value);
  };

  const handleFindItineraryEnd = event => {
    setFindItineraryEndInput(event.target.value);
  };

  const navigate = useNavigate();

  const findRouteCoords = () => {
    if (itineraryStart.length > 0 && itineraryEnd.length > 0) {
      localStorage.setItem(
        "lastSearchResults",
        `${itineraryStart}/${itineraryEnd}`
      );

      updateLocationHistory(findItineraryStartInput, findItineraryEndInput)
      navigate(`/results/${itineraryStart}/${itineraryEnd}`);
    }
    console.log(locationHistory);

    if (itineraryEnd.length > 0 && itineraryStart.length === 0) {
      setErrorMessage("Please enter your starting point");
    }

    if (itineraryStart.length > 0 && itineraryEnd.length === 0) {
      setErrorMessage("Please enter your destination");
    }
  };

  const queryDebounceDelayValue = 300;

  useEffect(() => {
    const findItineraryStartCoords = setTimeout(() => {
      findItineraryStartInput.length > 2 &&
        axios
          .get(
            `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findItineraryStartInput}&format=json`
          )
          .then(function (response) {
            setAvailableStartLocations(response.data);
            setShowAvailableStartLocations(true);
            setErrorMessage("");
          })
          .catch(function (error) {
            setErrorMessage("Unable to find address. Please try again.");
            console.log(error);
          });
    }, queryDebounceDelayValue);
    return () => clearTimeout(findItineraryStartCoords);
  }, [findItineraryStartInput]);

  useEffect(() => {
    const findItineraryEndCoords = setTimeout(() => {
      findItineraryEndInput.length > 2 &&
        axios
          .get(
            `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findItineraryEndInput}&format=json`
          )
          .then(function (response) {
            setAvailableEndLocations(response.data);
            setShowAvailableEndLocations(true);
            setErrorMessage("");
          })
          .catch(function (error) {
            setErrorMessage("Unable to find address. Please try again.");
            console.log(error);
          });
    }, queryDebounceDelayValue);
    return () => clearTimeout(findItineraryEndCoords);
  }, [findItineraryEndInput]);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setItineraryStart([
            position.coords.latitude,
            position.coords.longitude
          ]);
        });
      } else {
        alert("Please enable your location services in your browser settings");
      }
    };
    getUserLocation();
  }, []);

  return {
    errorMessage,
    setErrorMessage,
    imageIndex,
    setImageIndex,
    blurValue,
    setBlurValue,
    findingLocationLoading,
    setFindingLocationLoading,
    availableStartLocations,
    availableEndLocations,
    setAvailableStartLocations,
    setAvailableEndLocations,
    showAvailableStartLocations,
    showAvailableEndLocations,
    setShowAvailableStartLocations,
    setShowAvailableEndLocations,
    findRouteCoords,
    handleSelectStartLocation,
    handleSelectEndLocation,
    itineraryStart,
    setItineraryStart,
    itineraryEnd,
    setItineraryEnd,
    findItineraryStartInput,
    setFindItineraryStartInput,
    findItineraryEndInput,
    setFindItineraryEndInput,
    handleFindItineraryStart,
    handleFindItineraryEnd,
    availableStartLocationsHistory,
    setAvailableStartLocationsHistory,
    availableEndLocationsHistory,
    setAvailableEndLocationsHistory
  };
};
