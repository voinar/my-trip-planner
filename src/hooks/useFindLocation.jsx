import { useEffect, useState } from "react";
import axios from "axios";
import { useErrorMessage } from "hooks/useErrorMessage";

export const useFindLocation = () => {
  const defaultLocation = [51.505, 21.09];
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [zoomLevel, setZoomLevel] = useState(5);
  const [userLocation, setUserLocation] = useState(defaultLocation);
  const [findLocationInput, setFindLocationInput] = useState("");
  const [itineraryStart, setItineraryStart] = useState(defaultLocation);
  const [itineraryEnd, setItineraryEnd] = useState([]);
  const [findingLocationLoading, setFindingLocationLoading] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [showAvailableLocations, setShowAvailableLocations] = useState(false);
  const [findItineraryStartInput, setFindItineraryStartInput] = useState("");
  const [findItineraryEndInput, setFindItineraryEndInput] = useState("");

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleFindLocationInput = event => {
    setFindLocationInput(event.target.value);
    setErrorMessage("");
  };

  const findLocationCoords = () => {
    if (findLocationInput.length === 0) {
      setErrorMessage("Enter your search");
    }
    if (findLocationInput.length > 0) {
      setFindingLocationLoading(true);
      axios
        .get(
          `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findLocationInput}&format=json`
        )
        .then(function (response) {
          setAvailableLocations(response.data);
          setShowAvailableLocations(true);
          setZoomLevel(13);
          setFindingLocationLoading(false);
        })
        .catch(function (error) {
          setFindingLocationLoading(false);
          setErrorMessage(error.message);
          console.log('error',error.message);
        });
    }
  };

  const handleSelectedLocation = (lat, lon) => {
    setUserLocation([lat, lon]);
    setShowAvailableLocations(false);
  };

  const handleFindItineraryStart = event => {
    setFindItineraryStartInput(event.target.value);
  };

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setUserLocation([
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
    defaultLocation,
    errorMessage,
    setErrorMessage,
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
    handleSelectedLocation,
    itineraryStart,
    setItineraryStart,
    itineraryEnd,
    setItineraryEnd,
    findItineraryStartInput,
    setFindItineraryStartInput,
    findItineraryEndInput,
    setFindItineraryEndInput,
    handleFindItineraryStart
  };
};
