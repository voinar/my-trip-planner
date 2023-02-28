import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocationHistoryProvider } from "context/LocationHistoryContext";
import Navbar from "components/Navbar/Navbar";
import FindLocation from "./pages/FindLocation/FindLocation";
import TripPlanner from "./pages/TripPlanner/TripPlanner";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <LocationHistoryProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/find-location"
            element={<FindLocation />}
          />
          <Route
            path="/trip-planner"
            element={<TripPlanner />}
          />
          <Route
            path="/results/:param1/:param2"
            element={<ResultsPage />}
          />
        </Routes>
      </BrowserRouter>
    </LocationHistoryProvider>
  );
};

export default App;
