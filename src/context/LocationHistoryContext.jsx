// import { LocationHistoryContext } from "App";
import React, { useState, useContext } from "react";

const LocationHistoryContext = React.createContext();
const LocationHistoryUpdateContext = React.createContext();

export const useLocationHistory = () => {
  return useContext(LocationHistoryContext);
};

export const useUpdateLocationHistory = () => {
  return useContext(LocationHistoryUpdateContext);
};

// eslint-disable-next-line react/prop-types
export const LocationHistoryProvider = ({ children }) => {
  const [startLocationsHistory, setStartLocationsHistory] = useState([]);
  const [endLocationsHistory, setEndLocationsHistory] = useState([]);

  const updateSearchHistory = (
    findItineraryStartInput,
    findItineraryEndInput
  ) => {
    setStartLocationsHistory(prevItems => [
      ...prevItems,
      findItineraryStartInput
    ]);
    setEndLocationsHistory(prevItems => [...prevItems, findItineraryEndInput]);
  };

  return (
    <LocationHistoryContext.Provider
      value={[startLocationsHistory, endLocationsHistory]}>
      <LocationHistoryUpdateContext.Provider value={updateSearchHistory}>
        {children}
      </LocationHistoryUpdateContext.Provider>
    </LocationHistoryContext.Provider>
  );
};
