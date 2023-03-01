import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocationHistoryProvider } from "context/LocationHistoryContext";
import Navbar from "components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import FindLocation from "./pages/FindLocation/FindLocation";
import TripPlanner from "./pages/TripPlanner/TripPlanner";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import NotFound from "./pages/NotFound/NotFound";

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
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </LocationHistoryProvider>
  );
};

export default App;
