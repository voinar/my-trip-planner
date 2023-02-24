import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home container">
      <h1>Welcome to Trip Planner!</h1>
      <div className="home__planet">	&#128506;</div>
      {/* <ul>
        <li>
          <Link to="/find-location">
            <h3>Find location</h3>
          </Link>
        </li>
        <li>
          <Link to="/trip-planner">
            <h3>Trip Planner</h3>
          </Link>
        </li>
        <li>
          <Link to="/results">
            <h3>Results Page</h3>
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Home;
