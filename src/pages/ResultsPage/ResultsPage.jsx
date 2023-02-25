import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Circle
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const ResultsPage = () => {
  const { param1, param2 } = useParams();
  const itineraryStart = param1?.split(",");
  const itineraryEnd = param2?.split(",");

  const [distance, setDistance] = useState(0);
  const [pricePerKm, setPricePerKm] = useState(1);
  const [cost, setCost] = useState(0);

  const LeafletRoutingMachine = () => {
    const map = useMap();

    // useEffect(() => {
    const routeControl = L.Routing.control({
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
    }).addTo(map);

    routeControl.on("routesfound", function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(routes);
      // alert time and distance in km and minutes
      // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
      setDistance(
        Math.round((summary.totalDistance / 1000 + Number.EPSILON) * 100) / 100
      );
    });
    //   return () => {
    //     null;
    //   };
    // }, []);

    return null;
  };

  const MapWidget = () => (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      // center={[itineraryStart[0], itineraryStart[1]]}
      zoom={5}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletRoutingMachine />
    </MapContainer>
  );

  const handlePricePerKmChange = event => {
    () => setPricePerKm(event.target.value);
  };

  const calculateCost = () => {
    setCost(Number(distance * pricePerKm + (distance * pricePerKm) / 10));
  };

  const TripCostWidget = () => (
    <div>
      <div>distance: {distance}km</div>
      <div>price per km: {pricePerKm}</div>
      <input
        type="text"
        placeholder={pricePerKm}
        onChange={handlePricePerKmChange}
      />
      <button onClick={calculateCost}>Calculate</button>
      <div>cost: {cost}</div>
    </div>
  );

  return (
    <div className="results-page container">
      <h1>Your itinerary:</h1>
      <div>
        {param1 ? (
          <b>Parameter 1: {param1}</b>
        ) : (
          <i>Parameter 1 is optional.</i>
        )}
      </div>
      <div>
        {param2 ? (
          <b>Parameter 2: {param2}</b>
        ) : (
          <i>Parameter 2 is optional.</i>
        )}
      </div>
      <div className="trip-planner__map">
        <MapWidget />
      </div>
      <TripCostWidget />
    </div>
  );
};

export default ResultsPage;
