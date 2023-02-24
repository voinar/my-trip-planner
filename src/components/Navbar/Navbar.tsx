import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar container">
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
          <Link to="/results">
            <span>Results Page</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
