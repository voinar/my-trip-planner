import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [lastSearchResults, setLastSearchResults] = useState("");

  const refreshLocalStorageCache = () => {
    setLastSearchResults(localStorage.getItem("lastSearchResults").split("/"));
  };

  const getLastSearchResults = () => {
    if (lastSearchResults.length > 0) {
      return `/results/${lastSearchResults[0]}/${lastSearchResults[1]}`;
    }
    return `/results/first/use`;
  };

  return (
    <nav
      className="navbar"
      onMouseOver={refreshLocalStorageCache}>
      <ul>
        <Link to="/">
          <li>&#127758;</li>
        </Link>
        <li>
          <Link to="/find-location">
            <span>Find location</span>
          </Link>
        </li>
        <li>
          <Link to="/trip-planner">
            <span>Plan your trip</span>
          </Link>
        </li>
        <li>
          <Link to={getLastSearchResults()}>
            <span>Results Page</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
