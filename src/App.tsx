import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "components/Navbar/Navbar";
import FindLocation from "./pages/FindLocation/FindLocation";
import TripPlanner from "./pages/TripPlanner/TripPlanner";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Home from "./pages/Home/Home";

const App: () => JSX.Element = () => {
  return (
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

      {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    </BrowserRouter>
  );
};

export default App;
