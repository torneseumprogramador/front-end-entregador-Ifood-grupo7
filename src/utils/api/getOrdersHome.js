import axios from "../axiosConfig";
import getDriverByToken from "../getDriverByToken";

export default async () => {
  const driverLogged = getDriverByToken();
  const response = await axios.get(`orders?driver_id=${driverLogged.sub}`);
  const existsInTransit = response.data.find((order) => order.status === 2);

  if (existsInTransit) {
    return response.data.sort((a, b) => {
      if (a.status === 2) {
        return -1;
      }
      return 0;
    });
  }

  return response.data;
};
