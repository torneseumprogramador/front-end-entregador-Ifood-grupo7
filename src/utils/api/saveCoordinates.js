import axios from "../axiosConfig";
import getGeoLocation from "../getGeoLocation";

export default async (orderId) => {
  const coordinates = await getGeoLocation();
  const response = await axios.put(`orders/${orderId}/tracking`, {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timestamp: String(coordinates.timestamp),
  });
  return response.data;
};
