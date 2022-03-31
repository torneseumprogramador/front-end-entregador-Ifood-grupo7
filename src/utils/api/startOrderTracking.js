import axios from "../axiosConfig";
import getDriverByToken from "../getDriverByToken";

export default async (orderId) => {
  const driverLogged = getDriverByToken();
  const reponse = await axios.put(
    `orders/${orderId}/start-tracking?driver_id=${driverLogged.sub}`
  );
  return reponse.data;
};
