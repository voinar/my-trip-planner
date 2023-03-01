import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import TripCostWidget from "components/TripCostWidget/TripCostWidget";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { useTripPlanner } from "hooks/useTripPlanner";

const ResultsPage = () => {
  const { param1, param2 } = useParams();
  const { errorMessage, setErrorMessage } = useTripPlanner();

  const itineraryStart = param1?.split(",");
  const itineraryEnd = param2?.split(",");

  const [mapVisible, setMapVisible] = useState(true);
  const [distance, setDistance] = useState(0);

  const LeafletRoutingMachine = () => {
    const map = useMap();

    L.Routing.control({
      waypoints: [
        L.latLng(itineraryStart[0], itineraryStart[1]),
        L.latLng(itineraryEnd[0], itineraryEnd[1])
      ],
      lineOptions: {
        styles: [
          {
            color: "#ff00ff65",
            weight: 7,
            opacity: 0.5
          }
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 1
      },
      draggableWaypoints: false,
      routeWhileDragging: false,
      addWaypoints: false,
      showAlternatives: false
    })
      .addTo(map)
      .on("routesfound", e => {
        const routes = e.routes;
        const summary = routes[0].summary;

        setDistance(
          Math.round((summary.totalDistance / 1000 + Number.EPSILON) * 100) /
            100
        );
      })
      .on("routingerror", e => {
        setMapVisible(false);
        setErrorMessage(e.error.message);
        // console.log("routingerror", e);
      });

    return null;
  };

  const MapWidget = () => (
    <MapContainer
      style={{
        height: "100%",
        width: "100%"
      }}
      center={[itineraryStart[0], itineraryStart[1]]}
      zoom={5}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletRoutingMachine />
    </MapContainer>
  );

  return (
    <main className="results-page container">
      {param1 === "first" ? (
        <div className="home__history">
          <h3>This page will display your search results.</h3>
          <br/>
          <h2>
            Make sure to set your trip details{" "}
            <Link to="/trip-planner" style={{color: "green"}}>here</Link>
          </h2>
        </div>
      ) : (
        <>
          <h1>Your itinerary:</h1>
          <ErrorMessage
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <div
            className="trip-planner__container"
            style={{ display: mapVisible ? "flex" : "none" }}>
            <div className="trip-planner__map">
              <MapWidget />
            </div>
            <TripCostWidget distance={distance} />
          </div>
        </>
      )}
    </main>
  );
};

export default ResultsPage;
