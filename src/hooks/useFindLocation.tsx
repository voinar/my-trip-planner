import { useEffect, useState } from "react";
import axios from "axios";

export const useFindLocation = () => {
  const defaultLocation = [51.505, 21.09];
  const [zoomLevel, setZoomLevel] = useState(5);
  const [userLocation, setUserLocation] = useState(defaultLocation);
  const [findLocationInput, setFindLocationInput] = useState("");
  const [itineraryStart, setItineraryStart] = useState<any>(defaultLocation);
  const [itineraryEnd, setItineraryEnd] = useState<any>([]);
  const [findingLocationLoading, setFindingLocationLoading] = useState(false);
  const [availableLocations, setAvailableLocations] = useState<any>([]);
  const [showAvailableLocations, setShowAvailableLocations] = useState(false);
  const [findItineraryStartInput, setFindItineraryStartInput] = useState("");
  const [findItineraryEndInput, setFindItineraryEndInput] = useState("");

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleFindLocationInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFindLocationInput(event.target.value);
  };

  const findLocationCoords = () => {
    setFindingLocationLoading(true);
    axios
      .get(
        `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findLocationInput}&format=json`
      )
      .then(function (response) {
        // handle success
        setAvailableLocations(response.data);
        console.log("res", response);
        console.log("locs", availableLocations.data);
        setShowAvailableLocations(true);
        setZoomLevel(10);
        setFindingLocationLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setFindingLocationLoading(false);
      });
  };

  const handleSelectedLocation = (lat: any, lon: any) => {
    setUserLocation([lat, lon]);
    setShowAvailableLocations(false);
  };

  const handleFindItineraryStart = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFindItineraryStartInput(event.target.value);
  };

  const handleFindItineraryEnd = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFindItineraryEndInput(event.target.value);
  };

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        // console.log("Available");
        navigator.geolocation.getCurrentPosition(function (position) {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
          // console.log(userLocation);
        });
      } else {
        // console.log("Not Available");
        alert("Please enable your location services in your browser settings");
      }
    };
    getUserLocation();
  }, []);

  return {
    defaultLocation,
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
    handleFindItineraryStart,
    handleFindItineraryEnd
  };
};
