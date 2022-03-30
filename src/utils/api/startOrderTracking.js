import axios from "../axiosConfig";
import getDriverByToken from "../getDriverByToken";

export default async (orderId) => {
  const driverLogged = getDriverByToken();
  const reponse = await axios.put(
    `orders/${orderId}/start-tracking?driver_id=${driverLogged.id}`
  );
  return reponse.data;
};
