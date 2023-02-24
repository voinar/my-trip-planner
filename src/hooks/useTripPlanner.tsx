import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useTripPlanner = () => {
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
  const [availableEndLocations, setAvailableEndLocations] = useState<any>([]);
  const [showAvailableStartLocations, setShowAvailableStartLocations] =
    useState(false);
  const [showAvailableEndLocations, setShowAvailableEndLocations] =
    useState(false);
  const [findItineraryStartInput, setFindItineraryStartInput] = useState("");
  const [findItineraryEndInput, setFindItineraryEndInput] = useState("");

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleSelectStartLocation = (location: any) => {
    setItineraryStart([Number(location.lat), Number(location.lon)]);
    setShowAvailableStartLocations(false);
    setFindItineraryStartInput(location.display_name);
  };

  const handleSelectEndLocation = (location: any) => {
    setItineraryEnd([Number(location.lat), Number(location.lon)]);
    setShowAvailableEndLocations(false);
    setFindItineraryEndInput(location.display_name);
  };

  const handleFindItineraryStart = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFindItineraryStartInput(event.target.value);
    findItineraryStartCoords();
  };

  const handleFindItineraryEnd = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFindItineraryEndInput(event.target.value);
    findItineraryEndCoords();
  };

  const findItineraryStartCoords = () => {
    axios
      .get(
        `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findItineraryStartInput}&format=json`
      )
      .then(function (response) {
        // handle success
        setAvailableStartLocations(response.data);
        // console.log("res", response);
        // console.log("locs", availableStartLocations.data);
        setShowAvailableStartLocations(true);
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

  const findItineraryEndCoords = async () => {
    return axios
      .get(
        `https://eu1.locationiq.com/v1/search?key=${accessToken}&q=${findItineraryEndInput}&format=json`
      )
      .then(function (response) {
        // handle success
        setAvailableEndLocations(response.data);
        // console.log("res", response);
        setShowAvailableEndLocations(true);
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

  const navigate = useNavigate();

  const findRouteCoords = () => {
    console.log("findRouteCoords", itineraryStart, itineraryEnd);
    navigate(`/results/${itineraryStart}/${itineraryEnd}`);
  };

  console.log("dest", itineraryStart, itineraryEnd);

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
    findItineraryStartCoords,
    findItineraryEndCoords,
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
    handleFindItineraryEnd
  };
};
