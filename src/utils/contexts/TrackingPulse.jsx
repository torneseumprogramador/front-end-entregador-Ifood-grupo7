import React from "react";
import { Outlet } from "react-router-dom";
import saveCoordinates from "../api/saveCoordinates";
import { useQueryClient } from "react-query";

export const TrackingPulse = React.createContext();

export const TrackingPulseProvider = () => {
  const [pulseTracking, setPulseTracking] = React.useState(false);
  const [orderId, setPulseTrackingOrderId] = React.useState(null);
  const queryClient = useQueryClient();

  let interval = React.useRef();

  const startPulseTracking = () => {
    setPulseTracking(true);
  };

  const stopPulseTracking = () => {
    setPulseTracking(false);
  };

  React.useEffect(async () => {
    if (pulseTracking) {
      interval.current = setInterval(async () => {
        const response = await saveCoordinates(orderId);
        queryClient.invalidateQueries(["order"]);
        console.log(response);
      }, 1000 * 20); // 20 segundos
    } else {
      console.log("Parou");
      clearInterval(interval.current);
    }
  }, [pulseTracking]);

  return (
    <TrackingPulse.Provider
      value={{
        pulseTracking,
        startPulseTracking,
        stopPulseTracking,
        setPulseTrackingOrderId,
      }}
    >
      <Outlet />
    </TrackingPulse.Provider>
  );
};
