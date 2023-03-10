import React from "react";
import { useLocationHistory } from "context/LocationHistoryContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Home = () => {
  const locationHistory = useLocationHistory();

  const LocationHistory = () => {
    return locationHistory[0].length > 0 ? (
      <div>
        <ul className="home__history__locations">
          <span>Starting locations:</span>
          {locationHistory[0].map(item => (
            <li
              className="home__history__locations__item"
              key={uuidv4()}>
              {item}
            </li>
          ))}
        </ul>
        <ul className="home__history__locations">
          <span>Ending locations:</span>
          {locationHistory[1].map(item => (
            <li
              className="home__history__locations__item"
              key={uuidv4()}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="home__history__empty">
        <h3>
          Your search history is empty.{" "}
          <Link to="/trip-planner">Make your first search here.</Link>
        </h3>
      </div>
    );
  };

  return (
    <div className="home__container container">
      <div className="home__title">
        <h1>Welcome to My Trip Planner!</h1>
        <div className="home__planet"> &#128506;</div>
      </div>
      <main className="home__history">
        <h2>My search history:</h2>
        <LocationHistory />
      </main>
    </div>
  );
};

export default Home;
