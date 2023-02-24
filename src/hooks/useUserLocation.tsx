import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const defaultLocation = [51.505, 21.09];
  const [userLocation, setUserLocation] = useState(defaultLocation);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        // console.log("Available");
        navigator.geolocation.getCurrentPosition(function (position) {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
          // console.log(userLocation);
        });
      } else {
        // console.log("Not Available");
        alert("Please enable your location services in your browser settings");
      }
    };
    getUserLocation();
  }, []);

  return {
    defaultLocation,
    userLocation,
    setUserLocation,
  };
};
