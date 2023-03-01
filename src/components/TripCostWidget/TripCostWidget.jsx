import React, { useState, useEffect } from "react";
import IconCoins from "img/icons/icon-coins.svg";

const TripCostWidget = props => {
  const [pricePerKm, setPricePerKm] = useState(0);
  const [travelCost, setTravelCost] = useState(0);

  // eslint-disable-next-line react/prop-types
  const { distance } = props;

  useEffect(() => {
    setTravelCost(Number(distance * pricePerKm + (distance * pricePerKm) / 10));

    return () => {
      null;
    };
  }, [pricePerKm]);

  return (
    <form className="trip-planner__cost-widget">
      <img
        className="trip-planner__cost-widget__icon"
        src={IconCoins}
        alt="cost calculator"
      />
      <div className="trip-planner__cost-widget__distance">
        Distance: {distance}km
      </div>
      <input
        type="number"
        required
        placeholder="Enter price per km (PLN)"
        value={pricePerKm}
        onChange={event => setPricePerKm(event.target.value)}
      />
      <div>Cost: {parseFloat(travelCost).toFixed(2)} PLN</div>
    </form>
  );
};
export default TripCostWidget;
