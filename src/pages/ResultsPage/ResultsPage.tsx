import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Popup,
  useMapEvents,
  Circle
} from "react-leaflet";
import { useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const ResultsPage = () => {
  const { param1, param2 } = useParams();
  const itineraryStart: any = param1?.split(",");
  const itineraryEnd: any = param2?.split(",");

  const LeafletRoutingMachine = () => {
    const map = useMap();

    // useEffect(() => {
      L.Routing.control({
        waypoints: [
          L.latLng(
            itineraryStart[0],
            itineraryStart[1]
            // 51.6792,
            // 19.949
          ),
          L.latLng(
            itineraryEnd[0],
            itineraryEnd[1]
            // 51.6792,
            // 12.949
          )
        ]
      }).addTo(map);

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
      {/* <Marker position={[itineraryStart[0], itineraryStart[1]]}></Marker> */}
      <LeafletRoutingMachine />
    </MapContainer>
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
    </div>
  );
};

export default ResultsPage;
