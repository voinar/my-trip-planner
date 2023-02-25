import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useTripPlanner = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [itineraryStart, setItineraryStart] = useState<any>([
    // "52.2319581", "21.0067249"
  ]);
  const [itineraryEnd, setItineraryEnd] = useState<any>([
    // "50.0619474",
    // "19.9368564"
  ]);
  const [findingLocationLoading, setFindingLocationLoading] = useState(false);
  const [availableStartLocations, setAvailableStartLocations] = useState<any>(
    []
  );
  const [availableStartLocationsHistory, setAvailableStartLocationsHistory] =
    useState<any>([]);
  const [availableEndLocations, setAvailableEndLocations] = useState<any>([]);
  const [availableEndLocationsHistory, setAvailableEndLocationsHistory] =
    useState<any>([]);
  const [showAvailableStartLocations, setShowAvailableStartLocations] =
    useState(false);
  const [showAvailableEndLocations, setShowAvailableEndLocations] =
    useState(false);
  const [findItineraryStartInput, setFindItineraryStartInput] = useState("");
  const [findItineraryEndInput, setFindItineraryEndInput] = useState("");

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleSelectStartLocation = (location: any) => {
    setItineraryStart([Number(location.lat), Number(location.lon)]);
    setFindItineraryStartInput(location.display_name);
    setShowAvailableStartLocations(false);

    if (!availableStartLocationsHistory.includes(location.display_name)) {
      setAvailableStartLocationsHistory((prevState: any) => [
        ...prevState,
        location.display_name
      ]);
    }
  };

  const handleSelectEndLocation = (location: any) => {
    setItineraryEnd([Number(location.lat), Number(location.lon)]);
    setFindItineraryEndInput(location.display_name);
    setShowAvailableEndLocations(false);

    if (!availableEndLocationsHistory.includes(location.display_name)) {
      setAvailableEndLocationsHistory((prevState: any) => [
        ...prevState,
        location.display_name
      ]);
    }
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

  const queryDebounceDelayValue = 500;

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

  // useEffect(() => {
  //   const findItineraryEndCoords = setTimeout(() => {
  //     findItineraryEndInput.length > 2 &&
  //       axios
  //         .get(
  //           `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findItineraryEndInput}&format=json`
  //         )
  //         .then(function (response) {
  //           // handle success
  //           setAvailableEndLocations(response.data);
  //           // console.log("res", response);
  //           // console.log("locs", availableStartLocations.data);
  //           setShowAvailableEndLocations(true);
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           console.log(error);
  //         })
  //         .finally(function () {
  //           // always executed
  //         });
  //   }, queryDebounceDelayValue);
  //   return () => clearTimeout(findItineraryEndCoords);
  // }, [findItineraryEndInput]);

  const navigate = useNavigate();

  const findRouteCoords = () => {
    if (
      findItineraryStartInput.length > 2 &&
      findItineraryEndInput.length > 2
    ) {
      // setAvailableEndLocationsHistory((prevState: any) => [
      //   ...prevState,
      //   [findItineraryEndInput]
      // ]);

      console.log(
        "avilable",
        availableStartLocationsHistory,
        availableEndLocationsHistory
      );
      // // navigate(`/results/${itineraryStart}/${itineraryEnd}`);
    }

    if (itineraryEnd.length > 0 && itineraryStart.length === 0) {
      setErrorMessage("Please enter your starting point");
    }

    if (itineraryStart.length > 0 && itineraryEnd.length === 0) {
      setErrorMessage("Please enter your destination");
    }
  };

  // console.log("dest", itineraryStart, itineraryEnd);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        // console.log("Available");
        navigator.geolocation.getCurrentPosition(function (position) {
          setItineraryStart([
            position.coords.latitude,
            position.coords.longitude
          ]);
        });
      } else {
        // console.log("Not Available");
        alert("Please enable your location services in your browser settings");
      }
    };
    getUserLocation();
  }, []);

  return {
    errorMessage,
    setErrorMessage,
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
